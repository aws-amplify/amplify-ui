import { ConsoleLogger as Logger } from 'aws-amplify/utils';

import type {
  BannerMessageLayouts,
  InAppMessageAction,
  InAppMessageButton,
  MessageButtonProps,
  MessageComponentPosition,
  InAppMessageContent,
  MessageContentProps,
  OnMessageAction,
} from '../../types';

const logger = new Logger('InAppMessaging');

const positions: Record<BannerMessageLayouts, MessageComponentPosition> = {
  BOTTOM_BANNER: 'bottom',
  MIDDLE_BANNER: 'middle',
  TOP_BANNER: 'top',
};

export const getPositionProp = (
  layout: BannerMessageLayouts
): MessageComponentPosition => positions[layout];

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
      onActionCallback();
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
