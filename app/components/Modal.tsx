import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
  isOpen?: boolean;
  className?: string;
  showCloseButton?: boolean; // Optional prop to control close button visibility
}

const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  isOpen = true,
  className,
  showCloseButton = true, // Default to true
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Prevent close when clicking inside */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={clsx(
              "relative bg-white  rounded-lg w-full max-w-2xl mx-4 shadow-lg overflow-hidden",
              className
            )}
          >
            {/* Close Button */}
            {showCloseButton && onClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white rounded-full border border-gray-300 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md group"
                aria-label="Close modal"
              >
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}

            {/* Scrollable container */}
            <div className="max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
