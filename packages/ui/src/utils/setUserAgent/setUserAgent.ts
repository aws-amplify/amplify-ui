import { setCustomUserAgent } from '@aws-amplify/core/internals/utils';

import {
  ACCOUNT_SETTINGS_INPUT_BASE,
  AI_INPUT_BASE,
  AUTHENTICATOR_INPUT_BASE,
  FILE_UPLOADER_BASE_INPUT,
  IN_APP_MESSAGING_INPUT_BASE,
  LOCATION_SEARCH_INPUT_BASE,
  MAP_VIEW_INPUT_BASE,
  STORAGE_MANAGER_INPUT_BASE,
} from './constants';
import { noop } from '../utils';

// public packages only, exclude internal packages e.g. 'react-core', 'ui'
export type PackageName =
  | 'angular'
  | 'react'
  | 'react-ai'
  | 'react-auth'
  | 'react-geo'
  | 'react-liveness'
  | 'react-native'
  | 'react-native-auth'
  | 'react-notifications'
  | 'react-storage'
  | 'vue';

export type ComponentName =
  | 'AIConversation'
  | 'Authenticator'
  | 'ChangePassword'
  | 'DeleteUser'
  | 'FaceLivenessDetector'
  | 'FileUploader'
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

  switch (componentName) {
    case 'AIConversation': {
      setCustomUserAgent({
        ...AI_INPUT_BASE,
        additionalDetails: [[componentName], packageData],
      });
      break;
    }
    case 'Authenticator': {
      setCustomUserAgent({
        ...AUTHENTICATOR_INPUT_BASE,
        additionalDetails: [[componentName], packageData],
      });
      break;
    }
    case 'ChangePassword':
    case 'DeleteUser': {
      setCustomUserAgent({
        ...ACCOUNT_SETTINGS_INPUT_BASE,
        additionalDetails: [['AccountSettings'], packageData],
      });
      break;
    }
    case 'FileUploader': {
      setCustomUserAgent({
        ...FILE_UPLOADER_BASE_INPUT,
        additionalDetails: [[componentName], packageData],
      });
      break;
    }
    case 'InAppMessaging': {
      setCustomUserAgent({
        ...IN_APP_MESSAGING_INPUT_BASE,
        additionalDetails: [[componentName], packageData],
      });
      break;
    }
    case 'LocationSearch': {
      setCustomUserAgent({
        ...LOCATION_SEARCH_INPUT_BASE,
        additionalDetails: [[componentName], packageData],
      });
      break;
    }
    case 'MapView': {
      setCustomUserAgent({
        ...MAP_VIEW_INPUT_BASE,
        additionalDetails: [[componentName], packageData],
      });
      break;
    }
    case 'StorageManager': {
      setCustomUserAgent({
        ...STORAGE_MANAGER_INPUT_BASE,
        additionalDetails: [[componentName], packageData],
      });
      break;
    }
  }

  return noop as () => void;
};
