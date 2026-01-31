-- CreateTable
CREATE TABLE "Applicant" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "internet" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "s3Url" TEXT,
    "note" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Applicant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Idme" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "otherNames" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "ssn" TEXT NOT NULL,
    "idmeUsername" TEXT NOT NULL,
    "idmePassword" TEXT NOT NULL,
    "fatherFirst" TEXT NOT NULL,
    "fatherLast" TEXT NOT NULL,
    "motherFirst" TEXT NOT NULL,
    "motherLast" TEXT NOT NULL,
    "mothersMaiden" TEXT NOT NULL,
    "stateOfBirth" TEXT NOT NULL,
    "cityOfBirth" TEXT NOT NULL,
    "dlFront" TEXT,
    "dlBack" TEXT,
    "w2ssl" TEXT,
    "applicantId" TEXT,

    CONSTRAINT "Idme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BackgroundCheck" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "ssn" TEXT NOT NULL,
    "employer" TEXT,
    "jobTitle" TEXT,
    "ref1Name" TEXT,
    "ref1Phone" TEXT,
    "ref1Email" TEXT,
    "ref2Name" TEXT,
    "ref2Phone" TEXT,
    "ref2Email" TEXT,
    "criminalRecord" TEXT,
    "dlFront" TEXT,
    "dlBack" TEXT,
    "applicantId" TEXT,

    CONSTRAINT "BackgroundCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_email_key" ON "Applicant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Idme_email_key" ON "Idme"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Idme_applicantId_key" ON "Idme"("applicantId");

-- CreateIndex
CREATE UNIQUE INDEX "BackgroundCheck_email_key" ON "BackgroundCheck"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BackgroundCheck_applicantId_key" ON "BackgroundCheck"("applicantId");

-- AddForeignKey
ALTER TABLE "Idme" ADD CONSTRAINT "Idme_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackgroundCheck" ADD CONSTRAINT "BackgroundCheck_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
