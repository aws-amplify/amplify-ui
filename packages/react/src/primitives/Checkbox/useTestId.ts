import { useMemo } from 'react';
export const useTestId = (testId: string, component: string) => {
  const newTestId = useMemo(
    () => (testId && component ? `${testId}-${component}` : undefined),
    [testId, component]
  );
  return newTestId;
};
