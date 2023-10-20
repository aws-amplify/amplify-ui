import * as UserAgentModule from '@aws-amplify/core/internals/utils';

import {
  ACCOUNT_SETTINGS_INPUT_BASE,
  AUTHENTICATOR_INPUT_BASE,
  GEO_INPUT_BASE,
  IN_APP_MESSAGING_INPUT_BASE,
  STORAGE_INPUT_BASE,
} from '../setUserAgent/constants';
import { setUserAgent } from '../setUserAgent';
import { SetUserAgentOptions } from '../setUserAgent/setUserAgent';

describe('userAgent', () => {
  const setCustomUserAgentSpy = jest.spyOn(
    UserAgentModule,
    'setCustomUserAgent'
  );

  beforeEach(() => {
    setCustomUserAgentSpy.mockReset();
  });

  it('passes the expected input for AccountSettings', () => {
    const details: SetUserAgentOptions = {
      componentName: 'AccountSettings',
      packageName: 'react-auth',
      version: '1.0.0',
    };

    setUserAgent(details);

    expect(setCustomUserAgentSpy).toHaveBeenCalledTimes(1);
    expect(setCustomUserAgentSpy).toHaveBeenCalledWith({
      ...ACCOUNT_SETTINGS_INPUT_BASE,
      additionalDetails: [['AccountSettings'], ['ui-react-auth', '1.0.0']],
    });
  });

  it('passes the expected input for Authenticator', () => {
    const details: SetUserAgentOptions = {
      componentName: 'Authenticator',
      packageName: 'react-auth',
      version: '1.0.0',
    };

    setUserAgent(details);

    expect(setCustomUserAgentSpy).toHaveBeenCalledTimes(1);
    expect(setCustomUserAgentSpy).toHaveBeenCalledWith({
      ...AUTHENTICATOR_INPUT_BASE,
      additionalDetails: [['Authenticator'], ['ui-react-auth', '1.0.0']],
    });
  });

  it('passes the expected input for InAppMessaging', () => {
    const details: SetUserAgentOptions = {
      componentName: 'InAppMessaging',
      packageName: 'react-notifications',
      version: '1.0.0',
    };

    setUserAgent(details);

    expect(setCustomUserAgentSpy).toHaveBeenCalledTimes(1);
    expect(setCustomUserAgentSpy).toHaveBeenCalledWith({
      ...IN_APP_MESSAGING_INPUT_BASE,
      additionalDetails: [
        ['InAppMessaging'],
        ['ui-react-notifications', '1.0.0'],
      ],
    });
  });

  it('passes the expected input for LocationSearch', () => {
    const details: SetUserAgentOptions = {
      componentName: 'LocationSearch',
      packageName: 'react-geo',
      version: '1.0.0',
    };

    setUserAgent(details);

    expect(setCustomUserAgentSpy).toHaveBeenCalledTimes(1);
    expect(setCustomUserAgentSpy).toHaveBeenCalledWith({
      ...GEO_INPUT_BASE,
      additionalDetails: [['LocationSearch'], ['ui-react-geo', '1.0.0']],
    });
  });

  it('passes the expected input for MapView', () => {
    const details: SetUserAgentOptions = {
      componentName: 'MapView',
      packageName: 'react-geo',
      version: '1.0.0',
    };

    setUserAgent(details);

    expect(setCustomUserAgentSpy).toHaveBeenCalledTimes(1);
    expect(setCustomUserAgentSpy).toHaveBeenCalledWith({
      ...GEO_INPUT_BASE,
      additionalDetails: [['MapView'], ['ui-react-geo', '1.0.0']],
    });
  });

  it('passes the expected input for StorageManager', () => {
    const details: SetUserAgentOptions = {
      componentName: 'StorageManager',
      packageName: 'react-storage',
      version: '1.0.0',
    };

    setUserAgent(details);

    expect(setCustomUserAgentSpy).toHaveBeenCalledTimes(1);
    expect(setCustomUserAgentSpy).toHaveBeenCalledWith({
      ...STORAGE_INPUT_BASE,
      additionalDetails: [['StorageManager'], ['ui-react-storage', '1.0.0']],
    });
  });
});
