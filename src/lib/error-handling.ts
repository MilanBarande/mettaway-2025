/**
 * Error handling utilities for the application
 * 
 * Usage examples:
 * 
 * In React components:
 * ```tsx
 * import { useErrorModal } from '@/contexts/ErrorModalContext';
 * 
 * function MyComponent() {
 *   const { showErrorModal } = useErrorModal();
 *   
 *   const handleAction = async () => {
 *     try {
 *       await someRiskyOperation();
 *     } catch (error) {
 *       // Send to Sentry (which will automatically show the modal)
 *       Sentry.captureException(error);
 *       // Or manually show the modal
 *       // showErrorModal();
 *     }
 *   };
 * }
 * ```
 * 
 * In API routes or server-side code:
 * Just throw errors or use Sentry.captureException() - the client-side
 * Sentry integration will show the modal automatically when errors are captured.
 */

import * as Sentry from "@sentry/nextjs";

/**
 * Handles API errors and returns a standardized error response
 * Also captures the error in Sentry
 */
export function handleApiError(error: unknown, context?: string) {
  console.error(`API Error${context ? ` in ${context}` : ''}:`, error);
  
  // Capture in Sentry with additional context
  Sentry.captureException(error, {
    tags: {
      errorType: 'api_error',
      context: context || 'unknown',
    },
  });

  return {
    success: false,
    error: error instanceof Error ? error.message : 'An unexpected error occurred',
  };
}

/**
 * Wraps an async function with error handling
 * Automatically captures errors in Sentry (which will show the modal on the client)
 */
export function withErrorHandling<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  context?: string
): T {
  return (async (...args: unknown[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error(`Error in ${context || fn.name}:`, error);
      Sentry.captureException(error, {
        tags: {
          context: context || fn.name,
        },
      });
      throw error;
    }
  }) as T;
}

