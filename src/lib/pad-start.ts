/**
 * Fallback for `padStart` when `String.prototype.fallback` is not available. Do not use directly.
 * @private exported for testing only
 */
export function padStartFallback(string: string, targetLength: number, padChar: string) {
  if (string.length >= targetLength) {
    return string;
  }
  let padding = '';
  const diff = targetLength - string.length;

  for (let i = 0; i < diff; i++) {
    padding += padChar;
  }

  return padding + string;
}

export function padStart(string: string, targetLength: number, padChar: string) {
  if (string.padStart) {
    return string.padStart(targetLength, padChar);
  }

  return padStartFallback(string, targetLength, padChar);
}
