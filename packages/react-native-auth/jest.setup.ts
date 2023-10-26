global.navigator = {
  // @ts-expect-error
  ClientDevice_Browser: jest.fn(Promise.resolve),
};
