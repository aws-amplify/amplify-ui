import {
  useDeprecationWarning as useDeprecationWarningBase,
  UseDeprecationWarning,
} from '@aws-amplify/ui-react-core';

/**
 * Logs a deprecation warning `message` to the console.
 */
export const useDeprecationWarning: UseDeprecationWarning = ({
  message,
  shouldWarn: _shouldWarn,
}): void => {
  const shouldWarn =
    _shouldWarn &&
    // show message on builds without Node `process` polyfill
    // or with process.env.NODE_ENV not production
    (typeof process === 'undefined' ||
      (process && process.env.NODE_ENV !== 'production'));
  useDeprecationWarningBase({ message, shouldWarn });
};
