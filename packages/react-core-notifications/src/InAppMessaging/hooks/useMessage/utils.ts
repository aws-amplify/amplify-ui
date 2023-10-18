import { ConsoleLogger as Logger } from '@aws-amplify/core';

import {
  BannerMessageLayouts,
  MessageAction,
  MessageButton,
  MessageButtonProps,
  MessageComponentPosition,
  MessageContent,
  MessageContentProps,
  OnMessageAction,
} from '../../types';

const logger = new Logger('Notifications.InAppMessaging');

const positions: Record<BannerMessageLayouts, MessageComponentPosition> = {
  BOTTOM_BANNER: 'bottom',
  MIDDLE_BANNER: 'middle',
  TOP_BANNER: 'top',
};

export const getPositionProp = (
  layout: BannerMessageLayouts
): MessageComponentPosition => positions[layout];

export const getActionHandler = (
  actionParams: { action: MessageAction; url?: string },
  onMessageAction: OnMessageAction,
  onActionCallback: () => void
): { onAction: () => void } => ({
  onAction() {
    try {
      onMessageAction(actionParams);
    } catch (e) {
      logger.error(`Message action failure: ${e}`);
    } finally {
      onActionCallback();
    }
  },
});

const getButtonProps = (
  { action, url, ...baseButtonProps }: MessageButton,
  onMessageAction: OnMessageAction,
  onActionCallback: () => void
): MessageButtonProps => ({
  ...baseButtonProps,
  ...getActionHandler({ action, url }, onMessageAction, onActionCallback),
});

export const getContentProps = (
  content: MessageContent,
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
