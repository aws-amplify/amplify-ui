import { ConsoleLogger as Logger } from '@aws-amplify/core';
import { InAppMessageAction } from '@aws-amplify/notifications';
import isString from 'lodash/isString';

const logger = new Logger('Notifications.InAppMessaging');

export type HandleMessageLinkAction = (url: string) => Promise<void>;

interface HandleMessageActionParams {
  action: InAppMessageAction;
  handleMessageLinkAction: HandleMessageLinkAction;
  url: string | undefined;
}

const handleMessageAction = ({
  action,
  handleMessageLinkAction,
  url,
}: HandleMessageActionParams): void => {
  logger.info(`Handle action: ${action}`);

  if (action === 'LINK' || action === 'DEEP_LINK') {
    if (!isString(url)) {
      logger.warn(`url must be of type string: ${url}`);
      return;
    }

    handleMessageLinkAction(url);
  }
};

export default handleMessageAction;
