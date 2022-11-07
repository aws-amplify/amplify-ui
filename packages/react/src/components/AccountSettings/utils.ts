import { PasswordValidator } from './ChangePassword/types';

export const runCustomValidators = (
  validators: PasswordValidator[],
  password: string
): string[] => {
  const errors: string[] = [];
  validators.forEach((validator) => {
    const error = validator(password);
    if (error) {
      errors.push(error);
    }
  });
  return errors.length > 0 ? errors : null;
};
