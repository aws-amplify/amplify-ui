import { ConsoleLogger as Logger } from '@aws-amplify/core';

import handleMessageLinkAction from '../handleMessageLinkAction';

const httpProtocol = 'http:';
const httpsProtocol = 'https:';
const unsupportedProtocol = 'foobar:';

const path = 'ui.docs.amplify.aws/';

const urlWithHttpProtocol = `${httpProtocol}//${path}`;
const urlWithHttpsProtocol = `${httpsProtocol}//${path}`;

const urlWithNoProtocol = path;
const urlWithUnsupportedProtocol = `${unsupportedProtocol}//${path}`;

// chain mockImplementation to turn off console output during tests
const warnSpy = jest.spyOn(Logger.prototype, 'warn').mockImplementation();

describe('handleMessageLinkAction', () => {
  const original = window.open;
  beforeAll(() => {
    // set window.open to mock function
    window.open = jest.fn();
  });

  afterAll(() => {
    // restore window.open
    window.open = original;
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('handles a url with http protocol', () => {
    handleMessageLinkAction(urlWithHttpProtocol);
    expect(window.open).toHaveBeenCalledWith(urlWithHttpProtocol);
  });

  it('handles a url with https protocol', () => {
    handleMessageLinkAction(urlWithHttpsProtocol);
    expect(window.open).toHaveBeenCalledWith(urlWithHttpsProtocol);
  });

  it('gracefully handles an url with no protocol', () => {
    handleMessageLinkAction(urlWithNoProtocol);
    expect(warnSpy).toHaveBeenCalledWith(
      `Unsupported url provided: ${urlWithNoProtocol}`
    );
    expect(window.open).not.toHaveBeenCalled();
  });

  it('gracefully handles a url with an unsupported protocol', () => {
    handleMessageLinkAction(urlWithUnsupportedProtocol);
    expect(warnSpy).toHaveBeenCalledWith(
      `Unsupported url protocol provided: ${unsupportedProtocol}`
    );
    expect(window.open).not.toHaveBeenCalled();
  });
});
