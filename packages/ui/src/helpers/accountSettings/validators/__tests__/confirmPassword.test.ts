import { getConfirmPasswordValidator } from '../confirmPassword';

describe('getConfirmPassword', () => {
  it('returns confirm password valiator as expected', () => {
    const validator = getConfirmPasswordValidator('pw');
    expect(validator).toMatchObject({
      validator: expect.any(Function),
      message: 'Your passwords must match',
      validationMode: 'onTouched',
    });
  });

  it('validates to true when passwords match', () => {
    const { validator } = getConfirmPasswordValidator('myPassword');
    const isValid = validator('myPassword');
    expect(isValid).toBe(true);
  });

  it('validates to false when passwords do not match', () => {
    const { validator } = getConfirmPasswordValidator('myPassword');
    const isValid = validator('mismatchingPassword');
    expect(isValid).toBe(false);
  });
});
