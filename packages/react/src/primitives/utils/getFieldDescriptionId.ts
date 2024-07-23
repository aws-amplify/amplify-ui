/**
 * Returns a string combining `descriptionId` with `-description` if `descriptiveText` is provided and `descriptionId` is not empty; otherwise, returns undefined.
 *
 * @param {string} descriptionId - The base ID to be used for creating the description ID.
 * @param {React.ReactNode} [descriptiveText] - The descriptive text. If provided, the function will append `-description` to `descriptionId`.
 * @returns {string | undefined} The combined ID string if `descriptiveText` is provided and `descriptionId` is not empty, otherwise `undefined`.
 */
export const getFieldDescriptionId = (
  descriptionId: string,
  descriptiveText?: React.ReactNode
): string | undefined =>
  descriptiveText && descriptionId ? `${descriptionId}-description` : undefined;
