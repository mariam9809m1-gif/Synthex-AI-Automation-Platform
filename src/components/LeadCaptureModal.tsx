import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { LeadCaptureSection } from './LeadCaptureSection';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ 
  isOpen, 
  onClose, 
  selectedPlan 
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl z-10 max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-2 sm:p-6 shadow-2xl scrollbar-thin"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 rounded-full border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <LeadCaptureSection initialPlan={selectedPlan} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
