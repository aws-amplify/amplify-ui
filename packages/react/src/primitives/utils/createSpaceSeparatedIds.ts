/**
 * Joins an array of strings and undefined values into a single string with spaces as separators.
 * If all elements are undefined, returns undefined.
 *
 * @param {(string | undefined)[]} ids - An array of strings or undefined values.
 * @returns {string | undefined} A single string with space-separated IDs, or undefined if all elements are undefined.
 */

export const createSpaceSeparatedIds = (
  ids: (string | undefined)[]
): string | undefined => {
  const joinedIds = ids.filter((id) => id !== undefined).join(' ');
  return joinedIds.length > 0 ? joinedIds : undefined;
};
