import { ValidatorSpec } from '../../../types';

export const getConfirmPasswordValidator = (
  password: string
): ValidatorSpec => {
  return {
    validationMode: 'onTouched',
    validator: (confirmPassword) => password === confirmPassword,
    message: 'Your passwords must match',
  };
};
