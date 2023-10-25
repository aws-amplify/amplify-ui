import {
  setCustomUserAgent,
  SetCustomUserAgentInput,
} from '@aws-amplify/core/internals/utils';

import {
  ACCOUNT_SETTINGS_INPUT_BASE,
  AUTHENTICATOR_INPUT_BASE,
  IN_APP_MESSAGING_INPUT_BASE,
  LOCATION_SEARCH_INPUT_BASE,
  MAP_VIEW_INPUT_BASE,
  STORAGE_MANAGER_INPUT_BASE,
} from './constants';

// public packages only, exclude internal packages e.g. 'react-core', 'ui'
export type PackageName =
  | 'angular'
  | 'react'
  | 'react-auth'
  | 'react-geo'
  | 'react-liveness'
  | 'react-native'
  | 'react-native-auth'
  | 'react-notifications'
  | 'react-storage'
  | 'vue';

export type ComponentName =
  | 'Authenticator'
  | 'ChangePassword'
  | 'DeleteUser'
  | 'FaceLivenessDetector'
  | 'InAppMessaging'
  | 'LocationSearch'
  | 'MapView'
  | 'StorageManager'
  | 'StorageImage';

// semver notation
export type Version = `${string}.${string}.${string}`;

export interface SetUserAgentOptions {
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
  const packageData: [string, string] = [`ui-${packageName}`, version];

  let input: SetCustomUserAgentInput | undefined;

  switch (componentName) {
    case 'Authenticator': {
      input = {
        ...AUTHENTICATOR_INPUT_BASE,
        additionalDetails: [[componentName], packageData],
      };
      break;
    }
    case 'ChangePassword':
    case 'DeleteUser': {
      input = {
        ...ACCOUNT_SETTINGS_INPUT_BASE,
        additionalDetails: [['AccountSettings'], packageData],
      };
      break;
    }
    case 'InAppMessaging': {
      input = {
        ...IN_APP_MESSAGING_INPUT_BASE,
        additionalDetails: [[componentName], packageData],
      };
      break;
    }
    case 'LocationSearch': {
      input = {
        ...LOCATION_SEARCH_INPUT_BASE,
        additionalDetails: [[componentName], packageData],
      };
      break;
    }
    case 'MapView': {
      input = {
        ...MAP_VIEW_INPUT_BASE,
        additionalDetails: [[componentName], packageData],
      };
      break;
    }
    case 'StorageManager': {
      input = {
        ...STORAGE_MANAGER_INPUT_BASE,
        additionalDetails: [[componentName], packageData],
      };
      break;
    }
    default:
      break;
  }
  return setCustomUserAgent(input);
};
