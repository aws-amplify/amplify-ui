import { isReactNative, Platform } from '../PlatformContext';

const platforms: Platform[] = ['react', 'react-native'];

describe('isReactNative', () => {
  it.each(platforms)(
    'returns the expected value when platform is %s',
    (platform) => {
      expect(isReactNative(platform)).toBe(platform === 'react-native');
    }
  );
});
