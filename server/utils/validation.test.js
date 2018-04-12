const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should allow valid info', () => {
    const response = isRealString('David');

    expect(response).toBe(true);
  });

  it('should allow strings with extra spaces', () => {
    const response = isRealString('   David   ');

    expect(response).toBe(true);
  });

  it('should reject non string values', () => {
    const response1 = isRealString(12345);
    const response2 = isRealString(['a', 'b', 'c']);
    const response3 = isRealString({ name: 'David' });

    expect(response1).toBe(false);
    expect(response2).toBe(false);
    expect(response3).toBe(false);
  });

  it('should reject strings if only spaces', () => {
    const response = isRealString('      ');

    expect(response).toBe(false);
  });
});
