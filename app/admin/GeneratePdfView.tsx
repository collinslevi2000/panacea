import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DefaultViewForPdf from "./DefaultViewForPdf";
import AgreementGenerator from "./Agreement/AgreementGenerator";
import ConfirmationLetterGenerator from "./confirmation/GenerateConfirm";
import JobDetailsGenerator from "./jobDetail/GenerateJobDetail";

type ViewKey = "default" | "confirm" | "agreement" | "jobDetail";

interface ViewConfig {
  key: ViewKey;
  label: string;
  component: React.ReactNode;
  description: string;
}

const VIEW_CONFIG: ViewConfig[] = [
  {
    key: "default",
    label: "Overview",
    component: <DefaultViewForPdf />,
    description: "General PDF tools and utilities",
  },
  {
    key: "confirm",
    label: "Confirmation Letter",
    component: <ConfirmationLetterGenerator />,
    description: "Generate employee confirmation letters",
  },
  {
    key: "agreement",
    label: "Appointment Letter",
    component: <AgreementGenerator />,
    description: "Generate appointment / agreement documents",
  },
  {
    key: "jobDetail",
    label: "Job Detail Letter",
    component: <JobDetailsGenerator />,
    description: "Generate detailed job information letters",
  },
];

const GeneratePdfView: FC = () => {
  const [activeView, setActiveView] = useState<ViewKey>("default");

  const currentView = VIEW_CONFIG.find((v) => v.key === activeView);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            PDF Document Generator
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl">
            Select a document type below to generate and export professional PDF
            documents.
          </p>
        </div>

        {/* Tool Selector */}
        <div className="bg-gray-900/60 backdrop-blur border border-gray-800 rounded-2xl shadow-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {VIEW_CONFIG.map((view) => (
              <motion.button
                key={view.key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveView(view.key)}
                className={`
                  w-full h-auto p-4 rounded-2xl text-left transition-all
                  ${
                    activeView === view.key
                      ? "bg-gray-700 shadow-md"
                      : "bg-gray-800 hover:bg-gray-700"
                  }
                `}
              >
                <div className="font-medium text-base">{view.label}</div>
                <div className="text-xs opacity-70 mt-1">
                  {view.description}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-gray-900/60 backdrop-blur border border-gray-800 rounded-2xl shadow-lg p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentView?.component}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GeneratePdfView;
