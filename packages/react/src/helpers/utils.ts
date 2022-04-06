import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

export const isDevelopment = () => process.env.NODE_ENV !== 'production';

const isEmptyObj = (val: any) => isObject(val) && isEmpty(val);

const isEmptyArr = (val: any) => isArray(val) && isEmpty(val);

/**
 * Does a comparison of each array value, plus a value equality check for empty
 * objects and arrays.
 */
export const areArrayValuesEqual = (arr1: unknown[], arr2: unknown[]) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((elem1, index) => {
    const elem2 = arr2[index];
    /**
     * edge cases: if both values are empty object/array, we consider them equal.
     * These can catch empty default values (`[]`, `{}`) that unintentionally point
     * to different refernces.
     *
     * We can consider doing a deep comparison, but left it here for efficiency
     * + practicality for authenticator state comparison purposes.
     */
    if (isEmptyArr(elem1) && isEmptyArr(elem2)) return true;
    if (isEmptyObj(elem1) && isEmptyObj(elem2)) return true;

    return elem1 === elem2;
  });
};

// Error message handling source:
// https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
type ErrorWithMessage = {
  message: string;
};

export const isErrorWithMessage = (
  error: unknown
): error is ErrorWithMessage => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
};

export const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
};

export const getErrorMessage = (error: unknown) => {
  return toErrorWithMessage(error).message;
};

export const getFormDataFromEvent = (
  event: React.FormEvent<HTMLFormElement>
) => {
  const formData = new FormData(event.target as HTMLFormElement);
  return Object.fromEntries(formData);
};
