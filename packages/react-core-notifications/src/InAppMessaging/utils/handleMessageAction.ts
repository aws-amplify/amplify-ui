import { ConsoleLogger as Logger } from 'aws-amplify/utils';
import { isString } from '@aws-amplify/ui';

import type { InAppMessageAction } from '../types';

const logger = new Logger('InAppMessaging');

export type HandleMessageLinkAction = (url: string) => void | Promise<void>;

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
      logger.warn(`url must be of type string. Received: ${url}`);
      return;
    }

    handleMessageLinkAction(url);
  }
};

export default handleMessageAction;
