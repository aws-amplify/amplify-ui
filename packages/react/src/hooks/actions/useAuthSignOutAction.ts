import { Auth, Hub } from 'aws-amplify';
import { SignOutOpts } from '@aws-amplify/auth/lib-esm/types/Auth';

import {
  UI_CHANNEL,
  ACTION_AUTH_SIGNOUT_FINISHED,
  ACTION_AUTH_SIGNOUT_STARTED,
  EVENT_ACTION_AUTH_SIGNOUT,
} from './constants';
import { getErrorMessage } from '../../helpers/utils';
import { AMPLIFY_SYMBOL } from '../../helpers/constants';

export interface UseAuthSignOutAction {
  (options?: SignOutOpts): () => Promise<void>;
}

/**
 * Action to Signout of Authenticated session
 * @internal
 */
export const useAuthSignOutAction: UseAuthSignOutAction =
  (options) => async () => {
    try {
      Hub.dispatch(
        UI_CHANNEL,
        {
          event: ACTION_AUTH_SIGNOUT_STARTED,
          data: { options },
        },
        EVENT_ACTION_AUTH_SIGNOUT,
        AMPLIFY_SYMBOL
      );

      await Auth.signOut(options);
      Hub.dispatch(
        UI_CHANNEL,
        {
          event: ACTION_AUTH_SIGNOUT_FINISHED,
          data: { options },
        },
        EVENT_ACTION_AUTH_SIGNOUT,
        AMPLIFY_SYMBOL
      );
    } catch (error) {
      Hub.dispatch(
        UI_CHANNEL,
        {
          event: ACTION_AUTH_SIGNOUT_FINISHED,
          data: { options, errorMessage: getErrorMessage(error) },
        },
        EVENT_ACTION_AUTH_SIGNOUT,
        AMPLIFY_SYMBOL
      );
    }
  };
