global.navigator = {
  // @ts-expect-error
  ClientDevice_Browser: jest.fn(Promise.resolve),
};

jest.mock('@aws-amplify/core/lib/utils/globalHelpers/index.native.js', () => ({
  encode: jest.fn(),
}));

jest.mock('@aws-amplify/react-native', () => ({
  computeModPow: jest.fn(),
  loadAsyncStorage: jest.fn(),
  loadBase64: jest.fn(),
  loadGetRandomValues: jest.fn(),
  loadUrlPolyfill: jest.fn(),
  nativeModule: jest.fn(),
}));
