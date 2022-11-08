import { FieldValidator } from '../../../types';

export const getConfirmPasswordValidator = (
  password: string
): FieldValidator => {
  return {
    event: 'onTouched',
    handler: (confirmPassword) => password === confirmPassword,
    message: 'Your passwords must match',
  };
};
