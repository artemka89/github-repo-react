import { getDisplayName } from './get-display-name';

describe('getDisplayName', () => {
  test('test with only first substring', () => {
    expect(getDisplayName('John')).toBe('JO');
  });
  test('test with two substrings', () => {
    expect(getDisplayName('John Doe')).toBe('JD');
  });
  test('test with email', () => {
    expect(getDisplayName('johndoe@test.com')).toBe('JO');
  });
  test('test with email', () => {
    expect(getDisplayName('john_doe@test.com')).toBe('JD');
  });
});
