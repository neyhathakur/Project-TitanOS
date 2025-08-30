export function log(message: string, debugOnly = false) {
  const debugEnabled = process.env.DEBUG_LOG === 'true';
  if (!debugOnly || debugEnabled) {
    const ts = new Date().toISOString();
    console.log(`[${ts}] ${message}`);
  }
}