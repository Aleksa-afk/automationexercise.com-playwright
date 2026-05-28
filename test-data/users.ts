import { config } from '../infrastructure/config';

/**
 * Static, read-only test users for operations that don't create data
 * (login, browse). Credentials come from the environment via `config`, never
 * hardcoded. Getters defer the env lookup until a test actually reads them.
 */
export const TEST_USERS = {
  standard: {
    get email(): string {
      return config.loginEmail;
    },
    get password(): string {
      return config.loginPassword;
    },
  },
};
