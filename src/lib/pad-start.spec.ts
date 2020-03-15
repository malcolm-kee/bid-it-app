import { padStart, padStartFallback } from './pad-start';

test(`padStart`, () => {
  expect(padStart('', 2, '0')).toBe('00');
  expect(padStart('9', 2, '0')).toBe('09');
  expect(padStart('29', 2, '0')).toBe('29');
  expect(padStart('129', 2, '0')).toBe('129');

  expect(padStartFallback('', 2, '0')).toBe('00');
  expect(padStartFallback('9', 2, '0')).toBe('09');
  expect(padStartFallback('29', 2, '0')).toBe('29');
  expect(padStartFallback('129', 2, '0')).toBe('129');
});
