import "server-only";

import { z } from "zod";

// Public env surface (NEXT_PUBLIC_*). Never put secrets here.
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default("nextjs-boilerplate"),
});

// Parse at startup. If anything is invalid the process fails immediately,
// which is the desired behaviour for configuration that must exist.
const parsed = envSchema.parse(process.env);

export const env = parsed;

// Re-export the validated object so consumers do not re-parse.
export type Env = typeof env;
