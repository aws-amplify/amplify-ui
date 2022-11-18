import { Linking } from 'react-native';
import { ConsoleLogger as Logger } from '@aws-amplify/core';

import handleMessageLinkAction from '../handleMessageLinkAction';

jest.mock('react-native', () => ({
  Linking: { canOpenURL: jest.fn(), openURL: jest.fn() },
}));

// use empty mockImplementation to turn off console output
const warnSpy = jest.spyOn(Logger.prototype, 'warn').mockImplementation();

const url = 'https://docs.amplify.aws/';
const error = 'ERROR';

describe('handleAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('logs a warning when Linking.canOpenUrl returns false', async () => {
    (Linking.canOpenURL as jest.Mock).mockResolvedValueOnce(false);

    await handleMessageLinkAction(url);

    expect(Linking.canOpenURL).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(`Unsupported url provided: ${url}`);
    expect(Linking.openURL).not.toHaveBeenCalled();
  });

  it('logs an error when Linking.canOpenUrl fails', async () => {
    (Linking.canOpenURL as jest.Mock).mockRejectedValueOnce(error);

    await handleMessageLinkAction(url);

    expect(warnSpy).toHaveBeenCalledWith(
      `Call to Linking.canOpenURL failed: ${error}`
    );
  });

  it('logs an error when Linking.openUrl fails', async () => {
    (Linking.canOpenURL as jest.Mock).mockResolvedValueOnce(true);
    (Linking.openURL as jest.Mock).mockRejectedValue(error);

    await handleMessageLinkAction(url);

    expect(warnSpy).toHaveBeenCalledWith(
      `Call to Linking.openURL failed: ${error}`
    );
  });
});
