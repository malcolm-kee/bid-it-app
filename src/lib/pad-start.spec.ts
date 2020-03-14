import { padStart } from './pad-start';

test(`padStart`, () => {
  expect(padStart('', 2, '0')).toBe('00');
  expect(padStart('9', 2, '0')).toBe('09');
  expect(padStart('29', 2, '0')).toBe('29');
  expect(padStart('129', 2, '0')).toBe('129');
});
