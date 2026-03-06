import { isFunction } from '@aws-amplify/ui';

import type { RegisterAuthListener } from '../credentials';

export function assertRegisterAuthListener(
  value: unknown
): asserts value is RegisterAuthListener {
  if (!isFunction(value)) {
    throw new Error(
      'StorageBrowser: `registerAuthListener` must be a function.'
    );
  }
}
