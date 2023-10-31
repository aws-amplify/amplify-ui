import { useEffect, useState } from 'react';
import { Dimensions, EventSubscription } from 'react-native';

import { isFunction } from '@aws-amplify/ui';

export type DeviceOrientation = 'portrait' | 'landscape';
const getDeviceOrientation = (): DeviceOrientation => {
  const { height, width } = Dimensions.get('screen');
  return height >= width ? 'portrait' : 'landscape';
};

export default function useDeviceOrientation(): {
  deviceOrientation: DeviceOrientation;
  isLandscapeMode: boolean;
  isPortraitMode: boolean;
} {
  const [deviceOrientation, setDeviceOrientation] =
    useState<DeviceOrientation>(getDeviceOrientation);
  const isLandscapeMode = deviceOrientation === 'landscape';
  const isPortraitMode = deviceOrientation === 'portrait';

  useEffect(() => {
    const handler = () => {
      setDeviceOrientation(getDeviceOrientation);
    };

    // The below cast and conditional unsubscribe handling is due to subscription removal variation
    // between `Dimensions.addEventListener` in React Native prior to and after v0.65.
    //
    // Beginning with v0.65, `Dimensions.addEventListener` returns an `EventSubscription` object,
    // which includes a `remove` method for removing the subscription. Prior versions return
    // `undefined`, and subscription removal is handled by `Dimensions.removeEventListener`,
    // which is deprecated in v0.65
    const subscription = Dimensions.addEventListener(
      'change',
      handler
    ) as unknown as EventSubscription;

    return () => {
      if (isFunction(subscription?.remove)) {
        subscription.remove();
      } else {
        (
          Dimensions as unknown as {
            // @todo-migration remove below, no longer needed
            removeEventListener: (event: 'change', handler: () => void) => void;
          }
        ).removeEventListener('change', handler);
      }
    };
  }, []);

  return { deviceOrientation, isLandscapeMode, isPortraitMode };
}
