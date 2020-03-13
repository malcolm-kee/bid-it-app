export const isNotNil = <T>(value: T | null | undefined): value is T =>
  typeof value !== 'undefined' && value !== null;
