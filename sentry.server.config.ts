// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

// Only initialize Sentry in production (disabled on localhost)
if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://e249354408f8f667b4120cd5d43e8966@o4510137030148096.ingest.de.sentry.io/4510137031852112",

    // Enable logs to be sent to Sentry
    enableLogs: true,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}
