import { AuthFormData, Validator } from '../types';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';

// Runs all validators given. Resolves if there are no error. Rejects otherwise.
export const runValidators = async (
  formData: AuthFormData,
  touchData: AuthFormData,
  validators: Validator[]
) => {
  const errors = await Promise.all(
    validators.map((validator) => validator(formData, touchData))
  );
  const mergedError = merge({}, ...errors);

  if (isEmpty(mergedError)) {
    // no errors were found
    return Promise.resolve();
  } else {
    return Promise.reject(mergedError);
  }
};
