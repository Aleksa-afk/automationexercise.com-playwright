// Framework-wide constants — stable values shared across layers, nothing env- or domain-specific.

/** Default target environment. Override at runtime via BASE_URL (see config.ts). */
export const DEFAULT_BASE_URL = 'https://automationexercise.com';

/** Storage-state file written by the `setup` project and reused by authenticated fixtures. */
export const AUTH_FILE = 'playwright/.auth/user.json';

/** Centralised route table so a URL change is made in one place. */
export const URLS = {
  home: '/',
  login: '/login',
  signup: '/signup',
  accountCreated: '/account_created',
  deleteAccount: '/delete_account',
} as const;
