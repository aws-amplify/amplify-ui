import { getConfirmPasswordValidator } from '../confirmPassword';

describe('getConfirmPassword', () => {
  it('returns confirm password valiator as expected', () => {
    const validator = getConfirmPasswordValidator('pw');
    expect(validator).toMatchObject({
      validate: expect.any(Function),
      message: 'Your passwords must match',
      validationMode: 'onTouched',
    });
  });

  it('validates to true when passwords match', () => {
    const { validate } = getConfirmPasswordValidator('myPassword');
    const isValid = validate('myPassword');
    expect(isValid).toBe(true);
  });

  it('validates to false when passwords do not match', () => {
    const { validate } = getConfirmPasswordValidator('myPassword');
    const isValid = validate('mismatchingPassword');
    expect(isValid).toBe(false);
  });
});
