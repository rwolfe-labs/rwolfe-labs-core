import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.string().optional(),
  POSTHOG_API_KEY: z.string().optional(),
  POSTHOG_UPSTREAM_HOST: z.string().optional(), // e.g. https://app.posthog.com or https://eu.posthog.com
  POSTHOG_PROXY_PATH: z.string().optional() // default /api/posthog
});

export type Env = z.infer<typeof envSchema>;

export function parseEnv(raw: Record<string, unknown> = process.env) {
  return envSchema.parse(raw);
}
