import {
  setCustomUserAgent,
  SetCustomUserAgentInput,
} from '@aws-amplify/core/internals/utils';

import {
  AUTHENTICATOR_INPUT_BASE,
  CHANGE_PASSWORD_INPUT_BASE,
  DELETE_USER_INPUT_BASE,
  IN_APP_MESSAGING_INPUT_BASE,
  LOCATION_SEARCH_INPUT_BASE,
  MAP_VIEW_INPUT_BASE,
  STORAGE_INPUT_BASE,
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
  let input: SetCustomUserAgentInput | undefined;

  const additionalDetails: SetCustomUserAgentInput['additionalDetails'] = [
    [componentName],
    [`ui-${packageName}`, version],
  ];

  switch (componentName) {
    case 'Authenticator': {
      input = { ...AUTHENTICATOR_INPUT_BASE, additionalDetails };
      break;
    }
    case 'ChangePassword': {
      input = { ...CHANGE_PASSWORD_INPUT_BASE, additionalDetails };
      break;
    }
    case 'DeleteUser': {
      input = { ...DELETE_USER_INPUT_BASE, additionalDetails };
      break;
    }
    case 'InAppMessaging': {
      input = { ...IN_APP_MESSAGING_INPUT_BASE, additionalDetails };
      break;
    }
    case 'LocationSearch': {
      input = { ...LOCATION_SEARCH_INPUT_BASE, additionalDetails };
      break;
    }
    case 'MapView': {
      input = { ...MAP_VIEW_INPUT_BASE, additionalDetails };
      break;
    }
    case 'StorageManager': {
      input = { ...STORAGE_INPUT_BASE, additionalDetails };
      break;
    }
    default:
      break;
  }
  return setCustomUserAgent(input);
};
