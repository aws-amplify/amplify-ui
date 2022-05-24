import { ConsoleLogger as Logger } from '@aws-amplify/core';
import {
  Notifications,
  InAppMessageInteractionEvent,
} from '@aws-amplify/notifications';
import isNil from 'lodash/isNil';

import { useInAppMessaging } from '../useInAppMessaging';

import { UseMessage, UseMessageParams } from './types';
import { getContentProps, getPositionProp } from './utils';

const { InAppMessaging } = Notifications;

const logger = new Logger('Notifications.InAppMessaging');

/**
 * Utility hook for parsing a message and retrieving its corresponding UI component and props
 *
 * @param {UseMessageParams} props - platform specific UI components, action handler, and styles
 * @returns {UseMessage} message UI component and props
 */

export default function useMessage<Style>({
  components,
  onMessageAction,
  styles,
}: UseMessageParams<Style>): UseMessage<Style> {
  const { clearInAppMessage, inAppMessage } = useInAppMessaging();
  const { BannerMessage, CarouselMessage, FullScreenMessage, ModalMessage } =
    components;

  if (isNil(inAppMessage)) {
    return { Component: null, props: null };
  }

  const { content, layout } = inAppMessage;

  const onActionCallback = () => {
    InAppMessaging.notifyMessageInteraction(
      inAppMessage,
      InAppMessageInteractionEvent.MESSAGE_ACTION_TAKEN
    );
    clearInAppMessage();
  };

  const onClose = () => {
    InAppMessaging.notifyMessageInteraction(
      inAppMessage,
      InAppMessageInteractionEvent.MESSAGE_DISMISSED
    );
    clearInAppMessage();
  };

  const onDisplay = () => {
    InAppMessaging.notifyMessageInteraction(
      inAppMessage,
      InAppMessageInteractionEvent.MESSAGE_DISPLAYED
    );
  };

  switch (layout) {
    case 'BOTTOM_BANNER':
    case 'MIDDLE_BANNER':
    case 'TOP_BANNER': {
      const props = {
        ...getContentProps(content?.[0], onMessageAction, onActionCallback),
        layout,
        onClose,
        onDisplay,
        position: getPositionProp(layout),
        style: styles?.bannerMessage,
      };
      return { Component: BannerMessage, props };
    }
    case 'CAROUSEL': {
      const props = {
        data: content?.map((item) =>
          getContentProps(item, onMessageAction, onActionCallback)
        ),
        layout,
        onClose,
        onDisplay,
        style: styles?.carouselMessage,
      };
      return { Component: CarouselMessage, props };
    }
    case 'FULL_SCREEN': {
      const props = {
        ...getContentProps(content?.[0], onMessageAction, onActionCallback),
        layout,
        onClose,
        onDisplay,
        style: styles?.fullScreenMessage,
      };
      return { Component: FullScreenMessage, props };
    }
    case 'MODAL': {
      const props = {
        ...getContentProps(content?.[0], onMessageAction, onActionCallback),
        layout,
        onClose,
        onDisplay,
        style: styles?.modalMessage,
      };
      return { Component: ModalMessage, props };
    }
    default: {
      logger.info(`Received unknown InAppMessage layout: ${layout}`);
      return { Component: null, props: null };
    }
  }
}
