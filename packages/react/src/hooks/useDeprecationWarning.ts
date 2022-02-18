import * as React from 'react';

interface UseDeprecationWarning {
  shouldWarn?: boolean;
  message: string;
}

export const useDeprecationWarning = ({
  shouldWarn = true,
  message,
}: UseDeprecationWarning) => {
  React.useEffect(() => {
    if (
      shouldWarn &&
      // show message on builds without Node `process` polyfill
      // or with process.env.NODE_ENV not production
      (!process || (process && process.env.NODE_ENV !== 'production'))
    ) {
      console.warn(message);
    }
  }, [shouldWarn, message]);
};
