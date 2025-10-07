'use client';

import { useEffect } from 'react';
import { useErrorModal, setGlobalErrorModalHandler } from '@/contexts/ErrorModalContext';

export function ErrorModalInitializer() {
  const { showErrorModal } = useErrorModal();

  useEffect(() => {
    // Set up the global handler so Sentry can trigger the modal
    setGlobalErrorModalHandler(showErrorModal);

    return () => {
      setGlobalErrorModalHandler(() => {});
    };
  }, [showErrorModal]);

  return null;
}

