import { DEFAULT_BASE_URL } from './constants';

/** Reads a required env var, failing fast with a clear message instead of a confusing `undefined`. */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable "${name}". Copy .env.example to .env and fill it in.`);
  }
  return value;
}

/** Central runtime config. Credentials are lazy getters so only tests that need them fail when unset. */
export const config = {
  baseURL: process.env.BASE_URL ?? DEFAULT_BASE_URL,
  get loginEmail(): string {
    return requireEnv('LOGIN_EMAIL');
  },
  get loginPassword(): string {
    return requireEnv('LOGIN_PASSWORD');
  },
};
