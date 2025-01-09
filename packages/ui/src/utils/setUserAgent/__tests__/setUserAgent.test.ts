import * as UserAgentModule from '@aws-amplify/core/internals/utils';

import {
  ACCOUNT_SETTINGS_INPUT_BASE,
  AUTHENTICATOR_INPUT_BASE,
  IN_APP_MESSAGING_INPUT_BASE,
  LOCATION_SEARCH_INPUT_BASE,
  MAP_VIEW_INPUT_BASE,
  STORAGE_BROWSER_INPUT_BASE,
  STORAGE_MANAGER_INPUT_BASE,
} from '../constants';
import { setUserAgent } from '..';
import { SetUserAgentOptions } from '../setUserAgent';

describe('setUserAgent', () => {
  const setCustomUserAgentSpy = jest.spyOn(
    UserAgentModule,
    'setCustomUserAgent'
  );

  beforeEach(() => {
    setCustomUserAgentSpy.mockReset();
  });

  it('passes the expected input for Authenticator', () => {
    const details: SetUserAgentOptions = {
      componentName: 'Authenticator',
      packageName: 'vue',
      version: '1.0.0',
    };

    setUserAgent(details);

    expect(setCustomUserAgentSpy).toHaveBeenCalledTimes(1);
    expect(setCustomUserAgentSpy).toHaveBeenCalledWith({
      ...AUTHENTICATOR_INPUT_BASE,
      additionalDetails: [['Authenticator'], ['ui-vue', '1.0.0']],
    });
  });

  it('passes the expected input for ChangePassword', () => {
    const details: SetUserAgentOptions = {
      componentName: 'ChangePassword',
      packageName: 'react',
      version: '1.0.0',
    };

    setUserAgent(details);

    expect(setCustomUserAgentSpy).toHaveBeenCalledTimes(1);
    expect(setCustomUserAgentSpy).toHaveBeenCalledWith({
      ...ACCOUNT_SETTINGS_INPUT_BASE,
      additionalDetails: [['AccountSettings'], ['ui-react', '1.0.0']],
    });
  });

  it('passes the expected input for DeleteUser', () => {
    const details: SetUserAgentOptions = {
      componentName: 'DeleteUser',
      packageName: 'react',
      version: '1.0.0',
    };

    setUserAgent(details);

    expect(setCustomUserAgentSpy).toHaveBeenCalledTimes(1);
    expect(setCustomUserAgentSpy).toHaveBeenCalledWith({
      ...ACCOUNT_SETTINGS_INPUT_BASE,
      additionalDetails: [['AccountSettings'], ['ui-react', '1.0.0']],
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
      ...LOCATION_SEARCH_INPUT_BASE,
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
      ...MAP_VIEW_INPUT_BASE,
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
      ...STORAGE_MANAGER_INPUT_BASE,
      additionalDetails: [['StorageManager'], ['ui-react-storage', '1.0.0']],
    });
  });

  it('passes the expected input for StorageBrowser', () => {
    const details: SetUserAgentOptions = {
      componentName: 'StorageBrowser',
      packageName: 'react-storage',
      version: '1.0.0',
    };

    setUserAgent(details);

    expect(setCustomUserAgentSpy).toHaveBeenCalledTimes(1);
    expect(setCustomUserAgentSpy).toHaveBeenCalledWith({
      ...STORAGE_BROWSER_INPUT_BASE,
      additionalDetails: [['StorageBrowser'], ['ui-react-storage', '1.0.0']],
    });
  });
});
