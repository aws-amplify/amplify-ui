import { Platform } from 'react-native';

const IS_DEV = __DEV__;
const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';

// https://material.io/design/layout/spacing-methods.html#touch-targets
const ANDROID_MINIMUM_TOUCH_TARGET = 48;
// https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/
const IOS_MINIMUM_TOUCH_TARGET = 44;

const PLATFORM_TOUCH_TARGET = Platform.select({
  android: ANDROID_MINIMUM_TOUCH_TARGET,
  ios: IOS_MINIMUM_TOUCH_TARGET,
});

export default {
  ...Platform,
  IS_ANDROID,
  IS_DEV,
  IS_IOS,
  PLATFORM_TOUCH_TARGET,
};
