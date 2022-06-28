// import { Linking } from 'react-native';
import { ConsoleLogger as Logger } from '@aws-amplify/core';
import { HandleMessageLinkAction } from '@aws-amplify/ui-react-core';

const logger = new Logger('Notifications.InAppMessaging');

const handleMessageLinkAction: HandleMessageLinkAction = async (
  url: string
) => {
  let supported: boolean = false;
  try {
    const regex = new RegExp(
      '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
    );
    supported = regex.test(url);
  } catch (e) {
    logger.warn(`*******Call to Linking.canOpenURL failed: ${e}`);
  }

  if (!supported) {
    logger.warn(`Unsupported url provided: ${url}`);
    return;
  }

  try {
    logger.info(`Opening url: ${url}`);
    await window.open(url);
  } catch (e) {
    logger.warn(`******Call to Linking.openURL failed: ${e}`);
  }
};

export default handleMessageLinkAction;
