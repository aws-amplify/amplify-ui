import { Auth, Hub } from 'aws-amplify';
import { SignOutOpts } from '@aws-amplify/auth/lib-esm/types/Auth';

import {
  ACTION_EVENT_FINISHED,
  ACTION_EVENT_STARTED,
  HUB_AUTH_SIGNOUT_NAMESPACE,
} from './constants';
import { getErrorMessage } from '../../helpers/utils';

interface UseAuthSignOutAction {
  (opts?: SignOutOpts): () => Promise<void>;
}

export const useAuthSignOutAction: UseAuthSignOutAction =
  (opts) => async () => {
    try {
      Hub.dispatch(HUB_AUTH_SIGNOUT_NAMESPACE, {
        event: ACTION_EVENT_STARTED,
      });

      await Auth.signOut(opts);

      Hub.dispatch(HUB_AUTH_SIGNOUT_NAMESPACE, {
        event: ACTION_EVENT_FINISHED,
      });
    } catch (error) {
      Hub.dispatch(HUB_AUTH_SIGNOUT_NAMESPACE, {
        event: ACTION_EVENT_FINISHED,
        data: { errorMessage: getErrorMessage(error) },
      });
    }
  };
