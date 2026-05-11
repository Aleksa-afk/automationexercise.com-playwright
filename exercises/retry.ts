export async function retry<T>(fn: () => Promise<T>, retries: number): Promise<T> {
  // Loop retries-1 times with a safety net — if fn throws, we catch it and let
  // the loop continue to the next attempt instead of propagating the error.
  for (let attempt = 1; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch {
      // fn failed — loop continues to next attempt
    }
  }

  // Final attempt runs outside the loop with no catch, so if fn throws here
  // the error travels up to the caller. This avoids silently swallowing the
  // last failure and tells the caller exactly what went wrong.
  return fn();
}
