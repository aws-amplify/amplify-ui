import { FieldValidator } from '../../../types';

export const getConfirmPasswordValidator = (
  password: string
): FieldValidator => {
  return {
    validationMode: 'onTouched',
    validate: (confirmPassword) => password === confirmPassword,
    message: 'Your passwords must match',
  };
};
