import { ConsoleLogger as Logger } from '@aws-amplify/core';
import {
  InAppMessageInteractionEvent,
  Notifications,
} from '@aws-amplify/notifications';
import { isNil } from '@aws-amplify/ui';

import { RenderNothing } from '@aws-amplify/ui-react-core';
import { useInAppMessaging } from '../useInAppMessaging';
import { UseMessage, UseMessageParams } from './types';
import { getContentProps, getPositionProp } from './utils';

export const EMPTY_PROPS = Object.freeze({});

const logger = new Logger('Notifications.InAppMessaging');
const { InAppMessaging } = Notifications;

/**
 * Utility hook for parsing a message and retrieving its corresponding UI component and props
 *
 * @param {UseMessageParams} props - platform specific UI components, action handler, and styles
 * @returns {UseMessage} message UI component and props
 */

export default function useMessage<PlatformStyleProps>({
  components,
  onMessageAction,
}: UseMessageParams<PlatformStyleProps>): UseMessage<PlatformStyleProps> {
  const { clearMessage, message } = useInAppMessaging();
  const { BannerMessage, CarouselMessage, FullScreenMessage, ModalMessage } =
    components;

  if (isNil(message)) {
    return {
      Component: RenderNothing,
      props: EMPTY_PROPS as UseMessage<PlatformStyleProps>['props'],
    };
  }

  const { content, layout } = message;

  const onActionCallback = () => {
    InAppMessaging.notifyMessageInteraction(
      message,
      InAppMessageInteractionEvent.MESSAGE_ACTION_TAKEN
    );
    clearMessage();
  };

  const onClose = () => {
    InAppMessaging.notifyMessageInteraction(
      message,
      InAppMessageInteractionEvent.MESSAGE_DISMISSED
    );
    clearMessage();
  };

  const onDisplay = () => {
    InAppMessaging.notifyMessageInteraction(
      message,
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
      };
      return { Component: CarouselMessage, props };
    }
    case 'FULL_SCREEN': {
      const props = {
        ...getContentProps(content?.[0], onMessageAction, onActionCallback),
        layout,
        onClose,
        onDisplay,
      };
      return { Component: FullScreenMessage, props };
    }
    case 'MODAL': {
      const props = {
        ...getContentProps(content?.[0], onMessageAction, onActionCallback),
        layout,
        onClose,
        onDisplay,
      };
      return { Component: ModalMessage, props };
    }
    default: {
      logger.info(`Received unknown InAppMessage layout: ${layout}`);
      return {
        Component: RenderNothing,
        props: EMPTY_PROPS as UseMessage<PlatformStyleProps>['props'],
      };
    }
  }
}
