export const getTestId = (
  testId?: string,
  component?: string
): string | undefined =>
  testId && component ? `${testId}-${component}` : undefined;
