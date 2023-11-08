import { ImageSourcePropType } from 'react-native';

global.navigator = {
  // @ts-expect-error
  ClientDevice_Browser: jest.fn(Promise.resolve),
};

jest.mock('./src/assets', () => ({
  icons: {
    amazonLogo: { uri: 'amazonLogo' } as ImageSourcePropType,
    appleLogo: { uri: 'appleLogo' } as ImageSourcePropType,
    checkboxFilled: { uri: 'checkboxFilled' } as ImageSourcePropType,
    checkboxOutline: { uri: 'checkboxOutline' } as ImageSourcePropType,
    close: { uri: 'close' } as ImageSourcePropType,
    copy: { uri: 'copy' } as ImageSourcePropType,
    error: { uri: 'error' } as ImageSourcePropType,
    facebookLogo: { uri: 'facebookLogo' } as ImageSourcePropType,
    googleLogo: { uri: 'googleLogo' } as ImageSourcePropType,
    visibilityOn: { uri: 'visibilityOn' } as ImageSourcePropType,
    visibilityOff: { uri: 'visibilityOff' } as ImageSourcePropType,
  },
}));

jest.mock('@aws-amplify/core/lib/utils/globalHelpers/index.native.js', () => ({
  encode: jest.fn(),
}));

jest.mock(
  '@aws-amplify/core/lib/utils/sessionListener/SessionListener.native.js',
  () => ({
    SessionListener: jest.fn(),
  })
);

jest.mock('@aws-amplify/react-native', () => ({
  computeModPow: jest.fn(),
  loadAsyncStorage: jest.fn(),
  loadBase64: jest.fn(),
  loadGetRandomValues: jest.fn(),
  loadUrlPolyfill: jest.fn(),
  nativeModule: jest.fn(),
}));
