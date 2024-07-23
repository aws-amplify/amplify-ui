/**
 * Returns a string combining `errorMessageId` with `-error` if `hasError` is true and `errorMessageId` is provided; otherwise, returns undefined.
 *
 * @param {string} errorMessageId - The base ID to be used for creating the error message ID.
 * @param {boolean} [hasError=false] - Indicates whether there is an error. Defaults to false.
 * @returns {string | undefined} The combined ID string if `hasError` is true and `errorMessageId` is provided, otherwise `undefined`.
 */
export const getFieldErrorMessageId = (
  errorMessageId: string,
  hasError: boolean = false
): string | undefined =>
  hasError && errorMessageId ? `${errorMessageId}-error` : undefined;
