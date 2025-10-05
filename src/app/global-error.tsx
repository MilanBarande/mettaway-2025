"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        color: '#ededed',
        padding: '1rem'
      }}>
        <div style={{
          backgroundColor: 'rgba(127, 29, 29, 0.95)',
          padding: '2rem',
          borderRadius: '0.5rem',
          maxWidth: '28rem',
          border: '2px solid rgba(248, 113, 113, 0.5)'
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
            <div style={{ fontSize: '2.25rem', flexShrink: 0 }}>⚠️</div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>
                We Encountered an Error
              </h2>
              <p style={{ marginBottom: '1rem', lineHeight: '1.625' }}>
                Our developer has been automatically informed and this should be fixed soon. 
                Please contact us on Telegram if you still can't register in 3 days.
              </p>
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  fontWeight: '500',
                  borderRadius: '0.375rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}