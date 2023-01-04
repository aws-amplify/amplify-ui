global.navigator = {
  ClientDevice_Browser: jest.fn().mockImplementation(() => Promise.resolve()),
};
