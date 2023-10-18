import {
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
  | 'react-liveness'
  | 'react-native'
  | 'react-native-auth'
  | 'react-notifications'
  | 'react-storage'
  | 'vue';

type ComponentName =
  | 'AccountSettings'
  | 'Authenticator'
  | 'InAppMessaging'
  | 'FaceLivenessDetector'
  | 'LocationSearch'
  | 'MapView'
  | 'Storage';

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
      input = ACCOUNT_SETTINGS_INPUT_BASE as SetCustomUserAgentInput;
      break;
    }
    case 'Authenticator': {
      // remove cast when Category input types are available
      input = AUTHENTICATOR_INPUT_BASE as SetCustomUserAgentInput;
      break;
    }
    case 'InAppMessaging': {
      // remove cast when Category input types are available
      input = IN_APP_MESSAGING_INPUT_BASE as SetCustomUserAgentInput;
      break;
    }
    case 'LocationSearch': {
      // remove cast when Category input types are available
      input = GEO_INPUT_BASE as SetCustomUserAgentInput;
      break;
    }
    case 'MapView': {
      // remove cast when Category input types are available
      input = GEO_INPUT_BASE as SetCustomUserAgentInput;
      break;
    }
    case 'Storage': {
      // remove cast when Category input types are available
      input = STORAGE_INPUT_BASE as SetCustomUserAgentInput;
      break;
    }
    default:
      break;
  }
  return setCustomUserAgent({ ...input, additionalDetails });
};
