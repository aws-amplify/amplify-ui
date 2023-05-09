import { ConsoleLogger as Logger } from '@aws-amplify/core';

import { MessageAction } from '../../types';

import { handleMessageAction } from '..';

// use empty mockImplementation to turn off console output
const infoSpy = jest.spyOn(Logger.prototype, 'info').mockImplementation();
const warnSpy = jest.spyOn(Logger.prototype, 'warn').mockImplementation();

const close: MessageAction = 'CLOSE';
const deepLink: MessageAction = 'DEEP_LINK';
const link: MessageAction = 'LINK';
const url = 'https://docs.amplify.aws/';

const handleMessageLinkAction = jest.fn();

describe('handleMessageAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([deepLink, link])(
    'handles a %s action as expected in the happy path',
    (action: MessageAction) => {
      handleMessageAction({ action, handleMessageLinkAction, url });

      expect(infoSpy).toHaveBeenCalledWith(`Handle action: ${action}`);
      expect(infoSpy).toHaveBeenCalledTimes(1);
    }
  );

  it.each([deepLink, link])(
    'logs a warning and early returns when a %s action is provided with a null url value',
    (action: MessageAction) => {
      const invalidUrl = null as unknown as string;

      handleMessageAction({ action, handleMessageLinkAction, url: invalidUrl });

      expect(infoSpy).toHaveBeenCalledWith(`Handle action: ${action}`);
      expect(infoSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy).toHaveBeenCalledWith(
        'url must be of type string. Received: null'
      );
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(handleMessageLinkAction).not.toHaveBeenCalled();
    }
  );

  it.each([deepLink, link])(
    'logs a warning and early returns when a %s action is provided with an undefined url value',
    (action: MessageAction) => {
      const invalidUrl = undefined as unknown as string;

      handleMessageAction({ action, handleMessageLinkAction, url: invalidUrl });

      expect(infoSpy).toHaveBeenCalledWith(`Handle action: ${action}`);
      expect(warnSpy).toHaveBeenCalledWith(
        'url must be of type string. Received: undefined'
      );
      expect(infoSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(handleMessageLinkAction).not.toHaveBeenCalled();
    }
  );

  it('logs when called with a close action', () => {
    handleMessageAction({ action: close, handleMessageLinkAction, url });

    expect(infoSpy).toHaveBeenCalledWith(`Handle action: ${close}`);
    expect(infoSpy).toHaveBeenCalledTimes(1);
    expect(handleMessageLinkAction).not.toHaveBeenCalled();
  });
});
