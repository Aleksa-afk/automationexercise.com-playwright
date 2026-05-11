// This is the only place in the project that touches the API token.
// It reads from process.env — the Node.js object that holds all environment
// variables — so the token never has to be written directly in code.
//
// The throw is deliberate: without it, a missing token would silently produce
// an Authorization header of "Bearer undefined" and every test would fail with
// a confusing 401. Throwing here makes the misconfiguration obvious immediately,
// before a single test runs.
export function getAuthToken(): string {
  const token = process.env.API_TOKEN;
  if (!token) throw new Error('API_TOKEN env variable is not set');
  return token;
}
