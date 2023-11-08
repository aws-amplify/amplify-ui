global.navigator = {
  // @ts-expect-error
  ClientDevice_Browser: jest.fn(Promise.resolve),
};

jest.mock('@aws-amplify/react-native', () => ({
  computeModPow: jest.fn(),
  loadAppState: jest.fn(() => ({ addEventListener: jest.fn() })),
  loadAsyncStorage: jest.fn(),
  loadBase64: jest.fn(() => ({ encode: jest.fn() })),
  loadGetRandomValues: jest.fn(),
  loadUrlPolyfill: jest.fn(),
  nativeModule: jest.fn(),
}));
