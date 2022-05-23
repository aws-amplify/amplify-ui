export declare type DeviceOrientation = 'portrait' | 'landscape';
export default function useDeviceOrientation(): {
  deviceOrientation: DeviceOrientation;
  isLandscapeMode: boolean;
  isPortraitMode: boolean;
};
