import {
  InAppMessageAction,
  InAppMessageButton,
  InAppMessageContent,
  InAppMessageLayout,
} from '@aws-amplify/notifications';
import { ConsoleLogger as Logger } from '@aws-amplify/core';

import {
  MessageButtonProps,
  MessageComponentPosition,
  MessageContentProps,
  OnMessageAction,
} from '../../types';

const logger = new Logger('Notifications.InAppMessaging');

export const getPositionProp = (
  layout: InAppMessageLayout
): MessageComponentPosition => {
  switch (layout) {
    case 'BOTTOM_BANNER': {
      return 'bottom';
    }
    case 'MIDDLE_BANNER': {
      return 'middle';
    }
    case 'TOP_BANNER': {
      return 'top';
    }
    default: {
      return null;
    }
  }
};

export const getActionHandler = (
  actionParams: { action: InAppMessageAction; url?: string },
  onMessageAction: OnMessageAction,
  onActionCallback: () => void
): { onAction: () => void } => ({
  onAction() {
    try {
      onMessageAction(actionParams);
    } catch (e) {
      logger.error(`Message action failure: ${e}`);
    } finally {
      onActionCallback?.();
    }
  },
});

const getButtonProps = (
  { action, url, ...baseButtonProps }: InAppMessageButton,
  onMessageAction: OnMessageAction,
  onActionCallback: () => void
): MessageButtonProps => ({
  ...baseButtonProps,
  ...getActionHandler({ action, url }, onMessageAction, onActionCallback),
});

export const getContentProps = (
  content: InAppMessageContent,
  onMessageAction: OnMessageAction,
  onActionCallback: () => void
): MessageContentProps => {
  const props: MessageContentProps = {};

  if (!content) {
    return props;
  }

  const { primaryButton, secondaryButton, ...restContent } = content;

  if (primaryButton) {
    props.primaryButton = getButtonProps(
      primaryButton,
      onMessageAction,
      onActionCallback
    );
  }

  if (secondaryButton) {
    props.secondaryButton = getButtonProps(
      secondaryButton,
      onMessageAction,
      onActionCallback
    );
  }

  return { ...props, ...restContent };
};
