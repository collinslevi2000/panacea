"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import CustomDatePicker from "@/app/components/CustomDatePicker";

type FormState = {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  dob: string;
  ssn: string;
  employer: string;
  jobTitle: string;
  criminalRecord: string;
  dlFront: File | null;
  dlBack: File | null;
};

const initialFormState: FormState = {
  firstName: "",
  lastName: "",
  address: "",
  phone: "",
  email: "",
  dob: "",
  ssn: "",
  employer: "",
  jobTitle: "",
  criminalRecord: "",
  dlFront: null,
  dlBack: null,
};

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "application/pdf",
];

type ValidationConfig = {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  custom?: (value: string) => boolean;
  message: string;
  fileSize?: boolean;
};

const validationRules: Record<keyof FormState, ValidationConfig> = {
  firstName: { required: true, message: "First name is required" },
  lastName: { required: true, message: "Last name is required" },
  address: { required: true, message: "Address is required" },
  email: {
    required: true,
    message: "Valid email required",
  },
  phone: {
    required: true,
    // minLength: 10,
    message: "Valid phone number required",
  },
  ssn: {
    required: true,
    // pattern: /^\d{9}$/,
    message: "Invalid SSN (9 digits required)",
  },
  dob: { required: true, message: "Date of birth is required" },
  employer: { required: false, message: "" },
  jobTitle: { required: false, message: "" },
  criminalRecord: { required: false, message: "" },
  dlFront: {
    required: true,
    message: "Front of license required",
    fileSize: true,
  },
  dlBack: {
    required: true,
    message: "Back of license required",
    fileSize: true,
  },
};

const Input = React.memo(
  ({
    label,
    error,
    className = "",
    ...props
  }: React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
    className?: string;
  }) => (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        className={`w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${className} ${
          error ? "border-red-300" : ""
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  ),
);

Input.displayName = "Input";

export default function ApplicationForm() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const updateField = useCallback((name: keyof FormState, value: any) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const handleDateChange = useCallback(
    (date: Date | null) => {
      if (!date) return;
      updateField("dob", date.toISOString().split("T")[0]);
    },
    [updateField],
  );

  const validateField = useCallback(
    (name: keyof FormState, value: any, isSubmit = false): string => {
      const rule = validationRules[name];
      if (!rule) return "";

      // Skip file validation on field change unless submitting
      if ((name === "dlFront" || name === "dlBack") && !isSubmit) {
        return "";
      }

      if (rule.required) {
        if (value === null || value === undefined || value === "") {
          return rule.message;
        }

        // File validation
        if (value instanceof File) {
          if (!value) return rule.message;
        }

        // String validation
        if (typeof value === "string") {
          const trimmed = value.trim();
          if (!trimmed) return rule.message;

          if (rule.pattern && !rule.pattern.test(trimmed.replace(/\D/g, ""))) {
            return rule.message;
          }

          if (
            rule.minLength &&
            trimmed.replace(/\D/g, "").length < rule.minLength
          ) {
            return rule.message;
          }

          if (rule.custom && !rule.custom(trimmed)) {
            return rule.message;
          }
        }
      }

      return "";
    },
    [],
  );

  const validateFile = useCallback(
    (file: File | null, fieldName: string): string => {
      if (!file) {
        return validationRules[fieldName as keyof FormState]?.required
          ? validationRules[fieldName as keyof FormState].message
          : "";
      }

      // Check file size (2MB limit)
      if (file.size > MAX_FILE_SIZE) {
        return `File size must be less than 2MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`;
      }

      // Check file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return "Please upload a valid image (JPEG, PNG, GIF) or PDF file";
      }

      return "";
    },
    [],
  );

  const validateForm = useCallback(
    (isSubmit = false) => {
      const newErrors: Record<string, string> = {};
      const newFileErrors: Record<string, string> = {};

      Object.keys(form).forEach((key) => {
        const fieldName = key as keyof FormState;

        // Regular field validation
        const error = validateField(fieldName, form[fieldName], isSubmit);
        if (error) {
          newErrors[fieldName] = error;
        }

        // File validation for dlFront and dlBack
        if (
          (fieldName === "dlFront" || fieldName === "dlBack") &&
          form[fieldName]
        ) {
          const fileError = validateFile(form[fieldName] as File, fieldName);
          if (fileError) {
            newFileErrors[fieldName] = fileError;
          }
        }
      });

      setErrors(newErrors);
      setFileErrors(newFileErrors);
      return (
        Object.keys(newErrors).length === 0 &&
        Object.keys(newFileErrors).length === 0
      );
    },
    [form, validateField, validateFile],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      updateField(name as keyof FormState, value);
    },
    [updateField],
  );

  const isFormValid = useMemo(() => {
    // Check all required fields have values
    const requiredFieldsValid = Object.keys(validationRules).every((key) => {
      const field = key as keyof FormState;
      const rule = validationRules[field];
      if (!rule.required) return true;

      const value = form[field];
      if (value === null || value === undefined || value === "") return false;

      // Special validation for files
      if (field === "dlFront" || field === "dlBack") {
        if (!(value instanceof File)) return false;
        // Check file size
        if (value.size > MAX_FILE_SIZE) return false;
        // Check file type
        if (!ALLOWED_FILE_TYPES.includes(value.type)) return false;
      }

      return true;
    });

    return requiredFieldsValid;
  }, [form]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof FormState) => {
      const file = e.target.files?.[0] || null;

      // Clear previous file error for this field
      setFileErrors((prev) => {
        const { [fieldName]: _, ...rest } = prev;
        return rest;
      });

      // Validate file immediately
      if (file) {
        const error = validateFile(file, fieldName);
        if (error) {
          setFileErrors((prev) => ({ ...prev, [fieldName]: error }));
          // Reset the input
          e.target.value = "";
          updateField(fieldName, null);
          return;
        }
      }

      updateField(fieldName, file);
    },
    [updateField, validateFile],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setMessage(null);

      if (!validateForm(true)) return;

      setIsSubmitting(true);

      try {
        const formData = new FormData();

        // Append all text fields
        Object.entries(form).forEach(([key, value]) => {
          if (value instanceof File || value === null) return;
          formData.append(key, value);
        });

        // Append files
        if (form.dlFront) formData.append("dlFront", form.dlFront);
        if (form.dlBack) formData.append("dlBack", form.dlBack);

        const response = await fetch("/api/background-check", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          setMessage("Application submitted successfully");
          setForm(initialFormState);
          setFileErrors({});
          router.push("/applicants/background-check/thank-you");
        } else {
          setMessage(data.error || "Submission failed. Please try again.");
        }
      } catch (error: any) {
        setMessage(error.message || "An unexpected error occurred");
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, router, validateForm],
  );

  const formFields = useMemo(
    () => [
      {
        type: "text" as const,
        name: "firstName" as const,
        label: "First Name",
        gridCols: "md:col-span-1",
      },
      {
        type: "text" as const,
        name: "lastName" as const,
        label: "Last Name",
        gridCols: "md:col-span-1",
      },
      {
        type: "text" as const,
        name: "address" as const,
        label: "Address",
        gridCols: "md:col-span-2",
      },
      {
        type: "tel" as const,
        name: "phone" as const,
        label: "Phone",
        gridCols: "md:col-span-1",
      },
      {
        type: "email" as const,
        name: "email" as const,
        label: "Email",
        gridCols: "md:col-span-1",
      },
      {
        type: "text" as const,
        name: "ssn" as const,
        label: "SSN",
        gridCols: "md:col-span-1",
      },
      {
        type: "text" as const,
        name: "employer" as const,
        label: "Previous Employer",
        gridCols: "md:col-span-1",
      },
      {
        type: "text" as const,
        name: "jobTitle" as const,
        label: "Job Title",
        gridCols: "md:col-span-1",
      },
    ],
    [],
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 space-y-8">
          <header className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Background Check Application
            </h1>
            <p className="text-sm text-gray-500">
              Your information is encrypted and stored securely. Maximum file
              size: 2MB
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {formFields.map((field) => (
                <div
                  key={field.name}
                  className={field.name === "address" ? "md:col-span-2" : ""}
                >
                  <Input
                    type={field.type}
                    name={field.name}
                    label={field.label}
                    value={form[field.name] as string}
                    onChange={handleInputChange}
                    error={errors[field.name]}
                  />
                </div>
              ))}

              {/* Date of Birth Field - Handled separately */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <CustomDatePicker
                  name="dob"
                  value={form.dob}
                  onChange={handleDateChange}
                />
                {errors.dob && (
                  <p className="text-xs text-red-500 mt-1">{errors.dob}</p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Criminal Record Details (Optional)
              </label>
              <textarea
                name="criminalRecord"
                value={form.criminalRecord}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors min-h-[100px]"
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {[
                { name: "dlFront" as const, label: "Driver License Front" },
                { name: "dlBack" as const, label: "Driver License Back" },
              ].map(({ name, label }) => (
                <div key={name} className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    {label} (Max 2MB)
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,application/pdf"
                    onChange={(e) => handleFileChange(e, name)}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {form[name] && (
                    <p className="text-xs text-green-600 mt-1">
                      ✓ Selected: {form[name]?.name} (
                      {form[name]?.size && (form[name]!.size / 1024).toFixed(2)}{" "}
                      KB)
                    </p>
                  )}
                  {fileErrors[name] && (
                    <p className="text-xs text-red-500 mt-1">
                      {fileErrors[name]}
                    </p>
                  )}
                  {errors[name] && !fileErrors[name] && (
                    <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
                  )}
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className={`w-full rounded-2xl text-white py-3 font-medium transition-all duration-200
              ${
                isSubmitting || !isFormValid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>

            {message && (
              <div
                className={`p-4 rounded-xl text-sm border ${
                  message.includes("success")
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-red-50 border-red-200 text-red-700"
                }`}
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
