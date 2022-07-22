import { ConsoleLogger as Logger } from '@aws-amplify/core';
import { HandleMessageLinkAction } from '@aws-amplify/ui-react-core';

const logger = new Logger('Notifications.InAppMessaging');

const isValidUrl = (unvalidatedUrl: string): boolean => {
  let url: URL;

  try {
    url = new URL(unvalidatedUrl);
  } catch {
    logger.warn(`Unsupported url provided: ${unvalidatedUrl}`);
    return false;
  }

  const isHttpProtocol = url.protocol === 'http:';
  const isHttpsProtocol = url.protocol === 'https:';

  if (!(isHttpProtocol || isHttpsProtocol)) {
    logger.warn(`Unsupported url protocol provided: ${url.protocol}`);
    return false;
  }

  return true;
};

const handleMessageLinkAction: HandleMessageLinkAction = (url) => {
  const supported = isValidUrl(url);

  if (supported) {
    window.open(url);
  }
};

export default handleMessageLinkAction;
