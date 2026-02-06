// app/components/AdminDashboard.tsx
"use client";

import React, { useEffect } from "react";
import { ViewKey } from "@/types";
import useJobStore from "@/app/store/useJobStore";
import { useApplicants } from "@/app/hook/useApplicants";
import { ViewSelector } from "./ViewSelector";
import { DashboardLayout } from "./DashboardLayout";
import { ApplicantProfile } from "./ApplicantProfile";
import GeneratePdfView from "@/app/admin/GeneratePdfView";
import IdmeBackgroundMain from "./idme/IdmeBackgroundMain";
import Modal from "../Modal";
import { ModalView, useModalStore } from "@/app/store/useModalStore";
import { JobForm } from "@/app/admin/jobSection/JobForm";

export default function AdminDashboard(): React.ReactElement {
  const { applicants, loading: applicantsLoading, error: applicantsError, fetchApplicants } = useApplicants();
  const { fetchJobs } = useJobStore();
    const { closeModal, isOpen, view } = useModalStore();
  
  
  useEffect(() => {
    fetchApplicants();
    fetchJobs();
  }, []);

  const views = {
    applicants: (
      <ApplicantProfile
        applicants={applicants} 
        loading={applicantsLoading} 
        error={applicantsError}
      />
    ),
    pdf: <GeneratePdfView />,
    idme: <IdmeBackgroundMain/>,
  };
    const modalViews: Partial<Record<ModalView, JSX.Element>> = {
     addJob:<JobForm/>
    };

  return (
    <>
    
    <DashboardLayout>
      <ViewSelector views={views} />
    </DashboardLayout>
    <Modal isOpen={isOpen} onClose={closeModal}>
        {modalViews[view]}
      </Modal>
    </>
  );
}