import { ConsoleLogger as Logger } from '@aws-amplify/core';
import { InAppMessageAction } from '@aws-amplify/notifications';

import handleMessageAction from '../handleMessageAction';

// use empty mockImplementation to turn off console output
const infoSpy = jest.spyOn(Logger.prototype, 'info').mockImplementation();
const warnSpy = jest.spyOn(Logger.prototype, 'warn').mockImplementation();

const close: InAppMessageAction = 'CLOSE';
const deepLink: InAppMessageAction = 'DEEP_LINK';
const link: InAppMessageAction = 'LINK';
const url = 'https://docs.amplify.aws/';

const handleMessageLinkAction = jest.fn();

describe('handleMessageAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([deepLink, link])(
    'handles a %s action as expected in the happy path',
    (action: InAppMessageAction) => {
      handleMessageAction({ action, handleMessageLinkAction, url });

      expect(infoSpy).toHaveBeenCalledWith(`Handle action: ${action}`);
      expect(infoSpy).toHaveBeenCalledTimes(1);
    }
  );

  it.each([deepLink, link])(
    'logs a warning and early returns when a %s action is provided with a null url value',
    (action: InAppMessageAction) => {
      const invalidUrl = null as unknown as string;

      handleMessageAction({ action, handleMessageLinkAction, url: invalidUrl });

      expect(infoSpy).toHaveBeenCalledWith(`Handle action: ${action}`);
      expect(infoSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy).toHaveBeenCalledWith(
        `url must be of type string: ${invalidUrl}`
      );
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(handleMessageLinkAction).not.toHaveBeenCalled();
    }
  );

  it.each([deepLink, link])(
    'logs a warning and early returns when a %s action is provided with an undefined url value',
    (action: InAppMessageAction) => {
      const invalidUrl = undefined as unknown as string;

      handleMessageAction({ action, handleMessageLinkAction, url: invalidUrl });

      expect(infoSpy).toHaveBeenCalledWith(`Handle action: ${action}`);
      expect(warnSpy).toHaveBeenCalledWith(
        `url must be of type string: ${invalidUrl}`
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
