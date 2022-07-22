import { ConsoleLogger as Logger } from '@aws-amplify/core';

import handleMessageLinkAction from '../handleMessageLinkAction';

const validUrl = 'https://ui.docs.amplify.aws/';
const invalidUrl = 'invalidUrl';
const invalidUrlWithMalformedProtocol = `${invalidUrl}${validUrl}`;

const warnSpy = jest.spyOn(Logger.prototype, 'warn').mockImplementation();

describe('handleMessageLinkAction', () => {
  const original = { ...window };
  beforeAll(() => {
    // set window.open to mock function
    window.open = jest.fn();
  });

  afterAll(() => {
    // restore window
    window = { ...original };
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('handles a valid url', () => {
    handleMessageLinkAction(validUrl);
    expect(window.open).toHaveBeenCalledWith(validUrl);
  });

  it('gracefully handles an invalid url', () => {
    handleMessageLinkAction(invalidUrl);
    expect(warnSpy).toHaveBeenCalledWith(
      'Unsupported url provided: invalidUrl'
    );
    expect(window.open).not.toHaveBeenCalled();
  });

  it('gracefully handles a malformed url protocol', () => {
    handleMessageLinkAction(invalidUrlWithMalformedProtocol);
    expect(warnSpy).toHaveBeenCalledWith(
      'Unsupported url protocol provided: invalidurlhttps:'
    );
    expect(window.open).not.toHaveBeenCalled();
  });
});
