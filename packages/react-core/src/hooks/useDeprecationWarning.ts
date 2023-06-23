import * as React from 'react';

export type UseDeprecationWarning = (params: {
  shouldWarn: boolean;
  message: string;
}) => void;

/**
 * Logs a deprecation warning message.
 *
 * @inportant Please use the React/React Native specific platform implementations as the
 * hook and does not consider take whether the code is running in development or prod.
 */
const useDeprecationWarning: UseDeprecationWarning = ({
  shouldWarn,
  message,
}) => {
  React.useEffect(() => {
    if (shouldWarn) {
      // eslint-disable-next-line no-console
      console.warn(message);
    }
  }, [shouldWarn, message]);
};

export default useDeprecationWarning;
