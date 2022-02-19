import { useAuthSignOutAction } from '../useAuthSignOutAction';

import { Auth, Hub } from 'aws-amplify';
import {
  ACTION_AUTH_SIGNOUT_FINISHED,
  ACTION_AUTH_SIGNOUT_STARTED,
  EVENT_ACTION_AUTH_SIGNOUT,
  UI_CHANNEL,
} from '../constants';
import { AMPLIFY_SYMBOL } from '../../../helpers/constants';

jest.mock('aws-amplify');

const signOutSpy = jest.spyOn(Auth, 'signOut');
const hubDispatchSpy = jest.spyOn(Hub, 'dispatch');

describe('useAuthSignOutAction', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should call Auth.SignOut', async () => {
    const authSignOutAction = useAuthSignOutAction();

    await authSignOutAction();
    expect(signOutSpy).toHaveBeenCalledTimes(1);
  });

  it('should call Hub with started and finished events', async () => {
    const authSignOutAction = useAuthSignOutAction();

    await authSignOutAction();
    expect(hubDispatchSpy).toHaveBeenCalledTimes(2);
    expect(hubDispatchSpy).toHaveBeenCalledWith(
      UI_CHANNEL,
      {
        data: { options: undefined },
        event: ACTION_AUTH_SIGNOUT_STARTED,
      },
      EVENT_ACTION_AUTH_SIGNOUT,
      AMPLIFY_SYMBOL
    );
    expect(hubDispatchSpy).toHaveBeenCalledWith(
      UI_CHANNEL,
      {
        data: { options: undefined },
        event: ACTION_AUTH_SIGNOUT_FINISHED,
      },
      EVENT_ACTION_AUTH_SIGNOUT,
      AMPLIFY_SYMBOL
    );
  });

  it('should call Hub with started and finished events with options', async () => {
    const authSignOutAction = useAuthSignOutAction({ global: true });

    await authSignOutAction();
    expect(hubDispatchSpy).toHaveBeenCalledTimes(2);
    expect(hubDispatchSpy).toHaveBeenCalledWith(
      UI_CHANNEL,
      {
        data: { options: { global: true } },
        event: ACTION_AUTH_SIGNOUT_STARTED,
      },
      EVENT_ACTION_AUTH_SIGNOUT,
      AMPLIFY_SYMBOL
    );
    expect(hubDispatchSpy).toHaveBeenCalledWith(
      UI_CHANNEL,
      {
        data: { options: { global: true } },
        event: ACTION_AUTH_SIGNOUT_FINISHED,
      },
      EVENT_ACTION_AUTH_SIGNOUT,
      AMPLIFY_SYMBOL
    );
  });
});
