export const isDevelopment = (): boolean =>
  process.env.NODE_ENV !== 'production';

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

export const getErrorMessage = (error: unknown): string => {
  return toErrorWithMessage(error).message;
};

export const getFormDataFromEvent = (
  event: React.FormEvent<HTMLFormElement>
): { [k: string]: FormDataEntryValue } => {
  const formData = new FormData(event.target as HTMLFormElement);
  return Object.fromEntries(formData);
};
