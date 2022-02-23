export const isDevelopment = () => process.env.NODE_ENV !== 'production';

export const isInputOrSelectElement = (
  target: unknown
): target is HTMLInputElement | HTMLSelectElement => {
  return isInputElement(target) || isSelectElement(target);
};

export const isInputElement = (target: unknown): target is HTMLInputElement => {
  return (target as HTMLElement)?.nodeName === 'INPUT';
};

export const isSelectElement = (
  target: unknown
): target is HTMLInputElement => {
  return (target as HTMLElement)?.nodeName === 'SELECT';
};

export const areArraysEqual = (arr1: Array<any>, arr2: Array<any>) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value, index) => value === arr2[index]);
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
