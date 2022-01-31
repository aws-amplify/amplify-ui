import { Auth, Hub } from 'aws-amplify';
import type { HubPayload } from '@aws-amplify/core';
import { SignOutOpts } from '@aws-amplify/auth/lib-esm/types/Auth';

import {
  ACTIONS_CHANNEL,
  ACTION_AUTH_SIGNOUT_FINISHED,
  ACTION_AUTH_SIGNOUT_STARTED,
} from './constants';
import { getErrorMessage } from '../../helpers/utils';

interface UseAuthSignOutAction {
  (options?: SignOutOpts): () => Promise<void>;
}

/**
 * Action to Signout of Authenticated session
 * @internal
 */
export const useAuthSignOutAction: UseAuthSignOutAction =
  (options) => async () => {
    try {
      Hub.dispatch(ACTIONS_CHANNEL, {
        event: ACTION_AUTH_SIGNOUT_STARTED,
        data: { options },
      });

      await Auth.signOut(options);
      Hub.dispatch(ACTIONS_CHANNEL, {
        event: ACTION_AUTH_SIGNOUT_FINISHED,
        data: { options },
      });
    } catch (error) {
      Hub.dispatch(ACTIONS_CHANNEL, {
        event: ACTION_AUTH_SIGNOUT_FINISHED,
        data: { options, errorMessage: getErrorMessage(error) },
      });
    }
  };
