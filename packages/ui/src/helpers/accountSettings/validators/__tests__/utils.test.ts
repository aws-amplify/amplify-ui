import { getMinLengthValidator, hasUpperCase } from '../password';
import { shouldValidate, runFieldValidators } from '../util';

// example validators to test runFieldValidators
const passwordValidators = [getMinLengthValidator(8), hasUpperCase];

describe('shouldValidate', () => {
  // onBlur validationMode tests
  it('returns true if validationMode is onBlur and eventType is blur', () => {
    expect(shouldValidate('onBlur', 'blur', true)).toBe(true);
  });

  it('returns false if validationMode is onBlur and eventType is change', () => {
    expect(shouldValidate('onBlur', 'change', true)).toBe(false);
  });

  // onChange validationMode tests
  it('returns true if validationMode is onChange and eventType is change', () => {
    expect(shouldValidate('onChange', 'change', true)).toBe(true);
  });

  it('returns false if validationMode is onChange and eventType is blur', () => {
    expect(shouldValidate('onChange', 'blur', true)).toBe(false);
  });

  // onTouched valdiationMode tests
  it('returns true if validationMode is onTouched and eventType is blur', () => {
    expect(shouldValidate('onTouched', 'blur', true)).toBe(true);
  });

  it('returns true if validationMode is onTouched and eventType is change after first blur', () => {
    expect(shouldValidate('onTouched', 'change', true)).toBe(true);
  });

  it('returns false if validationMode is onTouched and eventType is change before first blur', () => {
    expect(shouldValidate('onTouched', 'change', false)).toBe(false);
  });
});

describe('runFieldValidators', () => {
  it('returns validation errors if field is invalid', () => {
    const errors = runFieldValidators(
      'badpw',
      passwordValidators,
      'blur',
      true
    );
    expect(errors).toStrictEqual([
      'Password must have at least 8 characters',
      'Password must have upper case letters',
    ]);
  });

  it('returns validation errors if field is invalid', () => {
    const errors = runFieldValidators(
      'totallySafePassword',
      passwordValidators,
      'blur',
      true
    );
    expect(errors).toStrictEqual([]);
  });

  it('returns empty array if there are no validators', () => {
    const errors = runFieldValidators('password', [], 'change', false);
    expect(errors).toStrictEqual([]);
  });

  it('returns empty array if field is empty', () => {
    const errors = runFieldValidators('', passwordValidators, 'blur', true);
    expect(errors).toStrictEqual([]);
  });
});
