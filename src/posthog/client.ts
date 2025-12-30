export type PosthogClientConfig = {
  apiKey: string;
  apiHost: string; // first-party ingest URL (e.g., "/api/posthog")
  uiHost?: string; // PostHog UI host (e.g., "https://app.posthog.com")
  capturePageview?: boolean;
  persistence?: "cookie" | "localStorage+cookie" | "memory";
};

export function getPosthogClientConfig(input: PosthogClientConfig) {
  return {
    apiKey: input.apiKey,
    apiHost: input.apiHost,
    uiHost: input.uiHost ?? "https://app.posthog.com",
    capturePageview: input.capturePageview ?? true,
    persistence: input.persistence ?? "cookie"
  };
}
