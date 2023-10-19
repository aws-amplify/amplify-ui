import {
  AuthUserAgentInput,
  GeoUserAgentInput,
  InAppMessagingUserAgentInput,
  StorageUserAgentInput,
  setCustomUserAgent,
  SetCustomUserAgentInput,
} from '@aws-amplify/core/internals/utils';

import {
  ACCOUNT_SETTINGS_INPUT_BASE,
  AUTHENTICATOR_INPUT_BASE,
  GEO_INPUT_BASE,
  IN_APP_MESSAGING_INPUT_BASE,
  STORAGE_INPUT_BASE,
} from './constants';

// public packages only, exclude internal packages e.g. 'react-core', 'ui'
type PackageName =
  | 'angular'
  | 'react'
  | 'react-auth'
  | 'react-geo'
  | 'react-native'
  | 'react-native-auth'
  | 'react-core-notifications'
  | 'react-storage'
  | 'vue';

type ComponentName =
  | 'AccountSettings'
  | 'Authenticator'
  | 'InAppMessaging'
  | 'LocationSearch'
  | 'MapView'
  | 'StorageManager';

// semver notation
type Version = `${string}.${string}.${string}`;

interface SetUserAgentOptions {
  componentName: ComponentName;
  packageName: PackageName;
  version: Version;
}

/**
 * @example
 * ```ts
 * // set user agent options
 * const clear = setUserAgent(input);
 *
 * // clear user agent options
 * clear();
 * ```
 */
export const setUserAgent = ({
  componentName,
  packageName,
  version,
}: SetUserAgentOptions): (() => void) => {
  let input: SetCustomUserAgentInput | undefined;

  const additionalDetails: SetCustomUserAgentInput['additionalDetails'] = [
    [componentName],
    [`ui-${packageName}`, version],
  ];

  switch (componentName) {
    case 'AccountSettings': {
      // remove cast when Category input types are available
      input = ACCOUNT_SETTINGS_INPUT_BASE as AuthUserAgentInput;
      break;
    }
    case 'Authenticator': {
      // remove cast when Category input types are available
      input = AUTHENTICATOR_INPUT_BASE as AuthUserAgentInput;
      break;
    }
    case 'InAppMessaging': {
      // remove cast when Category input types are available
      input = IN_APP_MESSAGING_INPUT_BASE as InAppMessagingUserAgentInput;
      break;
    }
    case 'LocationSearch': {
      // remove cast when Category input types are available
      input = GEO_INPUT_BASE as GeoUserAgentInput;
      break;
    }
    case 'MapView': {
      // remove cast when Category input types are available
      input = GEO_INPUT_BASE as GeoUserAgentInput;
      break;
    }
    case 'StorageManager': {
      // remove cast when Category input types are available
      input = STORAGE_INPUT_BASE as StorageUserAgentInput;
      break;
    }
    default:
      break;
  }
  return setCustomUserAgent({ ...input, additionalDetails });
};
