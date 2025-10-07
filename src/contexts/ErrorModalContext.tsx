'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ErrorModal } from '@/components/ErrorModal';

type ErrorModalContextType = {
  showErrorModal: () => void;
  hideErrorModal: () => void;
};

const ErrorModalContext = createContext<ErrorModalContextType | undefined>(undefined);

export function ErrorModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const showErrorModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const hideErrorModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ErrorModalContext.Provider value={{ showErrorModal, hideErrorModal }}>
      {children}
      <ErrorModal isOpen={isOpen} onClose={hideErrorModal} />
    </ErrorModalContext.Provider>
  );
}

export function useErrorModal() {
  const context = useContext(ErrorModalContext);
  if (context === undefined) {
    throw new Error('useErrorModal must be used within an ErrorModalProvider');
  }
  return context;
}

// Global function to show error modal from anywhere (including Sentry hooks)
let globalShowErrorModal: (() => void) | null = null;

export function setGlobalErrorModalHandler(handler: () => void) {
  globalShowErrorModal = handler;
}

export function showGlobalErrorModal() {
  if (globalShowErrorModal) {
    globalShowErrorModal();
  }
}

