import { AuthFormData, Validator } from "../types";
import { isEmptyObject } from "../util";

export const passwordMatches: Validator = (formValues: AuthFormData) => {
  const { password, confirm_password } = formValues;

  if (!password && !confirm_password) {
    // these inputs are clean, don't complain yet
    return null;
  } else if (!password || !confirm_password || password !== confirm_password) {
    // if one of the fields have been filled, or if both fields have been filled
    // but do not match, return error.
    return {
      confirm_password: "Your passwords must match",
    };
  }
};

// example of high order function that returns a validator
export const minLength: (fieldName: string, minLength: number) => Validator = (
  fieldName,
  minLength = 4
) => {
  return formData => {
    const fieldValue: string = formData[fieldName];
    if (fieldValue.length < minLength) {
      return {
        [fieldName]: `This field must have length of ${minLength} or greater.`,
      };
    }
  };
};

// Runs all validators given. Resolves if there are no error. Rejects otherwise.
export const runValidators = async (
  formData: AuthFormData,
  validators: Validator[]
) => {
  let validationErrors = {};
  for (const validator of validators) {
    const reportedError = await validator(formData);
    if (reportedError) {
      // TODO: merge field errors instead of overwriting them.
      validationErrors = { ...validationErrors, ...reportedError };
    }
  }

  if (isEmptyObject(validationErrors)) {
    // no errors were found
    return Promise.resolve();
  } else {
    return Promise.reject(validationErrors);
  }
};
