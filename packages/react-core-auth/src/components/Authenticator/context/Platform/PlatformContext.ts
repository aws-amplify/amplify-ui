import { createContextUtilities } from '@aws-amplify/ui-react-core';

interface PlatformContextType {
  platform: Platform;
}

export type Platform = 'react' | 'react-native';

export const { PlatformProvider, usePlatform } =
  createContextUtilities<PlatformContextType>({
    contextName: 'Platform',
    errorMessage: '`usePlatform` must be called inside a `PlatformProvider`',
  });

export const isReactNative = (platform: Platform): platform is 'react-native' =>
  platform === 'react-native';
