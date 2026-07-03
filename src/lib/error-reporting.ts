/**
 * Generic application error reporting utility.
 * Logs errors to the console and can be extended to send to any
 * monitoring service (e.g., Sentry, Datadog, LogRocket).
 */

type ErrorContext = Record<string, unknown>;

export function reportError(error: unknown, context: ErrorContext = {}): void {
  if (typeof window === "undefined") return;

  const message =
    error instanceof Error ? error.message : String(error);

  console.error("[App Error]", message, {
    ...context,
    route: window.location.pathname,
    timestamp: new Date().toISOString(),
  });

  // TODO: Plug in your preferred error monitoring service here.
  // Example (Sentry):
  //   import * as Sentry from "@sentry/react";
  //   Sentry.captureException(error, { extra: context });
}
