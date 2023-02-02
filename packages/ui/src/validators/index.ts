import { AuthFormData, PasswordSettings, Validator } from '../types';
import { isEmpty, merge } from '../utils';

// Runs all validators given. Resolves if there are no error. Rejects otherwise.
export const runValidators = async (
  formData: AuthFormData,
  touchData: AuthFormData,
  passwordSettings: PasswordSettings,
  validators: Validator[]
) => {
  const errors = await Promise.all(
    validators.map((validator) =>
      validator(formData, touchData, passwordSettings)
    )
  );
  const mergedError = merge({}, ...errors);

  if (isEmpty(mergedError)) {
    // no errors were found
    return Promise.resolve();
  } else {
    return Promise.reject(mergedError);
  }
};
