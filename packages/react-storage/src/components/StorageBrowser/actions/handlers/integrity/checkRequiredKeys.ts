export const checkRequiredKeys = <T extends object>(
  objectToCheck: T,
  objectName: string,
  requiredKeys: Extract<keyof T, string>[]
): void => {
  const missingValues = requiredKeys.filter(
    (key) => objectToCheck[key] === undefined || objectToCheck[key] === null
  );

  if (missingValues.length > 0) {
    throw Error(
      `Required keys missing for ${objectName}: ${[...missingValues].join(
        ', '
      )}.\nObject: ${JSON.stringify(objectToCheck)}`
    );
  }
};
