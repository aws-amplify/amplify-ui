import { ConsoleLogger as Logger } from '@aws-amplify/core';
import { HandleMessageLinkAction } from '@aws-amplify/ui-react-core-notifications';

const logger = new Logger('Notifications.InAppMessaging');

const handleMessageLinkAction: HandleMessageLinkAction = (input) => {
  let url: URL;

  try {
    url = new URL(input);
  } catch {
    logger.warn(`Unsupported url provided: ${input}`);
    return;
  }

  const { protocol } = url;

  const isHttpProtocol = protocol === 'http:';
  const isHttpsProtocol = protocol === 'https:';

  if (!(isHttpProtocol || isHttpsProtocol)) {
    logger.warn(`Unsupported url protocol provided: ${protocol}`);
    return;
  }

  window.open(input);
};

export default handleMessageLinkAction;
