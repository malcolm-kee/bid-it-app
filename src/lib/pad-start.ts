export function padStart(string: string, targetLength: number, padChar: string) {
  if (string.padStart) {
    return string.padStart(targetLength, padChar);
  }

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
