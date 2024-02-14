import { z } from 'zod';

const envSchema = z.object({
  VITE_POSTHOG_API_KEY: z.string(),
  VITE_POSTHOG_INSTANCE_ADDRESS: z.string(),
});

const env = envSchema.parse(import.meta.env);

export const POSTHOG_API_KEY = env.VITE_POSTHOG_API_KEY;
export const POSTHOG_INSTANCE_ADDRESS = env.VITE_POSTHOG_INSTANCE_ADDRESS;
