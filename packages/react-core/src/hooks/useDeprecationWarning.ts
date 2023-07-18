import * as React from 'react';

export type UseDeprecationWarning = (params: {
  shouldWarn: boolean;
  message: string;
}) => void;

/**
 * Logs a deprecation warning message.
 *
 * @important Please use the React/React Native specific platform implementations.
 * This version of the hook is a base implementation that the others extend from due
 * to env differences between running in RN or the browser
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
