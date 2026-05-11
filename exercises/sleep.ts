export function sleep(ms: number): Promise<void> {
  // setTimeout fires resolve() after ms milliseconds, which fulfills the Promise.
  // Returning that Promise lets callers use `await sleep(ms)` to suspend execution
  // in place — something raw setTimeout can't do because it's callback-based and
  // returns immediately without blocking the caller.
  return new Promise(resolve => setTimeout(resolve, ms));
}
