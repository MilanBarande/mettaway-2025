'use client';

import { useEffect } from 'react';

type ErrorModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ErrorModal({ isOpen = true, onClose }: ErrorModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-black/80 backdrop-blur-md rounded-lg shadow-2xl max-w-md w-full p-6 border-2 border-blue-400/30 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 text-4xl">
            💡
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-3">
              We Encountered an Error
            </h2>
            <p className="text-gray-200 mb-4 leading-relaxed">
              Our developer has been automatically informed and this should be fixed soon. 
              Please contact us on Telegram if you still can&apos;t register in 3 days.
            </p>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-md shadow-sm hover:shadow-md transition-colors duration-150"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

