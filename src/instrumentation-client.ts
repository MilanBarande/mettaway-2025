// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import { showGlobalErrorModal } from "@/contexts/ErrorModalContext";

Sentry.init({
  dsn: "https://e249354408f8f667b4120cd5d43e8966@o4510137030148096.ingest.de.sentry.io/4510137031852112",

  // Add optional integrations for additional features
  integrations: [
    Sentry.replayIntegration(),
  ],
  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Show error modal before sending to Sentry
  beforeSend(event, _hint) {
    // Show the error modal to the user
    showGlobalErrorModal();
    
    // Continue sending the event to Sentry
    return event;
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;