import { sleep } from './sleep';

export async function poll(
  condition: () => Promise<boolean>,
  timeout: number,
  interval: number
): Promise<void> {
  const start = Date.now();

  while (true) {
    // Evaluate the condition before checking elapsed time so the very first
    // check always runs even if timeout is extremely short.
    const result = await condition();
    if (result) return;

    const elapsed = Date.now() - start;

    // Only throw after evaluating — this way the error reflects the true last
    // observed state rather than timing out before the final check completes.
    if (elapsed >= timeout) {
      throw new Error(
        `Polling timed out after ${elapsed}ms — condition was still false ` +
        `(timeout: ${timeout}ms, interval: ${interval}ms)`
      );
    }

    await sleep(interval);
  }
}
