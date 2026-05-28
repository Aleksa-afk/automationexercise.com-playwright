// Unique identity helpers for data-creating tests.
// Date.now() alone collides under fullyParallel (same-ms calls); the random suffix prevents that.

/** Unique id: timestamp + 4 random digits. */
export function uniqueId(): string {
  const random = Math.floor(Math.random() * 10_000).toString().padStart(4, '0');
  return `${Date.now()}${random}`;
}

/** Unique email, e.g. testuser_17164...@mail.com. */
export function uniqueEmail(prefix = 'testuser'): string {
  return `${prefix}_${uniqueId()}@mail.com`;
}
