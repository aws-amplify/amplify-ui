import { getConfirmPasswordValidator } from '../confirmPassword';

describe('getConfirmPassword', () => {
  it('returns confirm password valiator as expected', () => {
    const validator = getConfirmPasswordValidator('pw');
    expect(validator).toMatchObject({
      handler: expect.any(Function),
      message: 'Your passwords must match',
      validationMode: 'onTouched',
    });
  });

  it('validates to true when passwords match', () => {
    const { handler } = getConfirmPasswordValidator('myPassword');
    const isValid = handler('myPassword');
    expect(isValid).toBe(true);
  });

  it('validates to false when passwords do not match', () => {
    const { handler } = getConfirmPasswordValidator('myPassword');
    const isValid = handler('mismatchingPassword');
    expect(isValid).toBe(false);
  });
});
