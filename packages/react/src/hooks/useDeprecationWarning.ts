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
    if (shouldWarn && process && process.env.NODE_ENV !== 'production') {
      console.warn(message);
    }
  }, [shouldWarn, message]);
};
