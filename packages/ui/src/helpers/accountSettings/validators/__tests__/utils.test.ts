import { getMinLengthValidator, hasUpperCase } from '../password';
import { shouldValidate, runFieldValidators } from '../util';

// example validators to test runFieldValidators
const passwordValidators = [getMinLengthValidator(8), hasUpperCase];

describe('shouldValidate', () => {
  // onBlur validationMode tests
  it('returns true if validationMode is onBlur and eventType is blur', () => {
    expect(
      shouldValidate({
        validationMode: 'onBlur',
        eventType: 'blur',
        hasBlurred: true,
      })
    ).toBe(true);
  });

  it('returns false if validationMode is onBlur and eventType is change', () => {
    expect(
      shouldValidate({
        validationMode: 'onBlur',
        eventType: 'change',
        hasBlurred: true,
      })
    ).toBe(false);
  });

  // onChange validationMode tests
  it('returns true if validationMode is onChange and eventType is change', () => {
    expect(
      shouldValidate({
        validationMode: 'onChange',
        eventType: 'change',
        hasBlurred: true,
      })
    ).toBe(true);
  });

  it('returns false if validationMode is onChange and eventType is blur', () => {
    expect(
      shouldValidate({
        validationMode: 'onChange',
        eventType: 'blur',
        hasBlurred: true,
      })
    ).toBe(false);
  });

  // onTouched valdiationMode tests
  it('returns true if validationMode is onTouched and eventType is blur', () => {
    expect(
      shouldValidate({
        validationMode: 'onTouched',
        eventType: 'blur',
        hasBlurred: true,
      })
    ).toBe(true);
  });

  it('returns true if validationMode is onTouched and eventType is change after first blur', () => {
    expect(
      shouldValidate({
        validationMode: 'onTouched',
        eventType: 'change',
        hasBlurred: true,
      })
    ).toBe(true);
  });

  it('returns false if validationMode is onTouched and eventType is change before first blur', () => {
    expect(
      shouldValidate({
        validationMode: 'onTouched',
        eventType: 'change',
        hasBlurred: false,
      })
    ).toBe(false);
  });
});

describe('runFieldValidators', () => {
  it('returns validation errors if field is invalid', () => {
    const errors = runFieldValidators({
      value: 'badpw',
      validators: passwordValidators,
      eventType: 'blur',
      hasBlurred: true,
    });
    expect(errors).toStrictEqual([
      'Password must have at least 8 characters',
      'Password must have upper case letters',
    ]);
  });

  it('returns validation errors if field is invalid', () => {
    const errors = runFieldValidators({
      value: 'totallySafePassword',
      validators: passwordValidators,
      eventType: 'blur',
      hasBlurred: true,
    });
    expect(errors).toStrictEqual([]);
  });

  it('returns empty array if there are no validators', () => {
    const errors = runFieldValidators({
      value: 'password',
      validators: [],
      eventType: 'change',
      hasBlurred: false,
    });
    expect(errors).toStrictEqual([]);
  });

  it('returns empty array if field is empty', () => {
    const errors = runFieldValidators({
      value: '',
      validators: passwordValidators,
      eventType: 'blur',
      hasBlurred: true,
    });
    expect(errors).toStrictEqual([]);
  });
});
