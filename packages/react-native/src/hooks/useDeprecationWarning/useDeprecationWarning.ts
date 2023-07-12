import {
  useDeprecationWarning as useDeprecationWarningBase,
  UseDeprecationWarning,
} from '@aws-amplify/ui-react-core';

import { platform } from '../../utils';

/**
 * Logs a deprecation warning `message` to the console.
 */
const useDeprecationWarning: UseDeprecationWarning = ({
  message,
  shouldWarn: _shouldWarn,
}): void => {
  // only log warnings in dev
  const shouldWarn = _shouldWarn && platform.IS_DEV;

  useDeprecationWarningBase({ message, shouldWarn });
};

export default useDeprecationWarning;
