import { createJob, getAllJobs, updateJob } from "@/lib/db/jobRepo";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getAllJobs();

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // Create new job with generated fields
    const newJob = {
 title: body.title,
      description: body.description,
      responsibilities: body.responsibilities ,
      qualifications: body.qualifications,
    };
  await createJob(newJob)
   
    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);
    await updateJob(body)
    
    return NextResponse.json(body, { status: 200 });
  } catch (error) {
    
  }
}