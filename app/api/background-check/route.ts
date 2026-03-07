// app/api/background-check/route.ts
import envStore from "@/app/envStore/store";
import { requestData } from "./helper";
import { sendMail } from "@/lib/mailer/resendMailer";
import { getApplicantByEmail } from "@/app/lib/db/applicantsRepo";
import { createApplicant } from "@/lib/db/applicantsRepo";
import {
  generateBackgroundCheckEmailHTML,
  generateBackgroundCheckText,
} from "@/lib/emails/bgcheckAdmin";
import { applicant } from "@/app/envStore/types";
import { createBackgroundCheck } from "@/lib/db/backgroundCheckRepo";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Get files correctly (swapped as per your code)
    const dlFront = formData.get("dlBack") as File;
    const dlBack = formData.get("dlFront") as File;

    if (!dlFront || !dlBack) {
      return new Response(
        JSON.stringify({
          message: "Both front and back license images are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    async function newBackgroundCheck(data: any, applicant: applicant) {
      return await createBackgroundCheck({
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        dob: data.dob,
        email: data.email,
        phone: data.phone,
        ssn: data.ssn,
        employer: data.employer,
        jobTitle: data.jobTitle,
        ref1Email: data.ref1Email,
        ref1Name: data.ref1Name,
        ref1Phone: data.ref1Phone,
        ref2Email: data.ref2Email,
        ref2Name: data.ref2Name,
        ref2Phone: data.ref2Phone,
        criminalRecord: data.criminalRecord,
        dlBack: "sent via email", // Just a placeholder
        dlFront: "sent via email", // Just a placeholder
        applicantId: applicant.id,
      });
    }

    const existingApplicant = await getApplicantByEmail(
      formData.get("email") as string,
    );

    let applicant;
    if (existingApplicant) {
      applicant = existingApplicant;
      await newBackgroundCheck(requestData(formData), existingApplicant);
    } else {
      const newApplicant = await createApplicant({
        firstName: requestData(formData).firstName,
        lastName: requestData(formData).lastName,
        email: requestData(formData).email,
        phone: requestData(formData).phone,
        dob: requestData(formData).dob,
        location: "",
        device: "",
        internet: "",
        availability: "",
        experience: "",
        note: "",
        status: "background check",
      });
      applicant = newApplicant;
      await newBackgroundCheck(requestData(formData), newApplicant);
    }

    // Convert files to Buffer for Resend attachments
    const dlFrontBuffer = Buffer.from(await dlFront.arrayBuffer());
    const dlBackBuffer = Buffer.from(await dlBack.arrayBuffer());

    // Generate HTML email content
    const html = generateBackgroundCheckEmailHTML({
      ...requestData(formData),
      applicantId: applicant.id,
    });

    const text = generateBackgroundCheckText({
      ...requestData(formData),
      applicantId: applicant.id,
    });

    // Send email with attachments
    const from = `${requestData(formData).firstName} ${requestData(formData).lastName} <${envStore.SMTP_USER}>`;

    await sendMail(
      {
        from,
        to: ["oye93@aol.com"],
        subject: "SeekPaneccea: New Background Check Submission",
        html,
        text,
        attachments: [
          {
            filename: `${requestData(formData).firstName}_${requestData(formData).lastName}_license_front.png`,
            content: dlFrontBuffer,
          },
          {
            filename: `${requestData(formData).firstName}_${requestData(formData).lastName}_license_back.png`,
            content: dlBackBuffer,
          },
        ],
      },
      envStore.RESEND_API_KEY,
    );

    return new Response(
      JSON.stringify({
        message: "Background check submitted successfully",
        applicantId: applicant.id,
        status: "success",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: `Error submitting background check: ${error.message}`,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
