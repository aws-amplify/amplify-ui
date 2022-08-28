import {
  InAppMessageInteractionEvent,
  Notifications,
} from '@aws-amplify/notifications';
import { ConsoleLogger as Logger } from '@aws-amplify/core';

import { RenderNothing } from '../../../../components';
import { useInAppMessaging } from '../../useInAppMessaging';
import {
  BannerMessageCommonProps,
  Message,
  MessageCommonProps,
} from '../../../types';
import { UseMessageParams } from '../types';

import { EMPTY_PROPS } from '../useMessage';
import { useMessage } from '..';

const notifyMessageInteractionSpy = jest.spyOn(
  Notifications.InAppMessaging,
  'notifyMessageInteraction'
);

jest.mock('../../useInAppMessaging');
jest.useFakeTimers();

type TestStyle = { backgroundColor: string };
type TestMessageProps = Required<MessageCommonProps<TestStyle>>;

const infoSpy = jest.spyOn(Logger.prototype, 'info');

const mockUseInAppMessaging = useInAppMessaging as jest.Mock;
const mockClearMessage = jest.fn();

const header = { content: 'header one' };
const baseMessage: Partial<Message> = {
  id: 'test',
  content: [{ header }],
};
const carouselMessage: Partial<Message> = {
  id: 'carousel',
  content: [{ header }, { header: { content: 'header two' } }],
  layout: 'CAROUSEL',
};

function BannerMessage() {
  return null;
}
function CarouselMessage() {
  return null;
}
function FullScreenMessage() {
  return null;
}
function ModalMessage() {
  return null;
}

const onMessageAction = jest.fn();
const components: UseMessageParams<TestStyle>['components'] = {
  BannerMessage,
  CarouselMessage,
  FullScreenMessage,
  ModalMessage,
};

describe('useMessage', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // happy path test for banner, modal and full screen layouts
  it.each([
    ['BOTTOM_BANNER', BannerMessage, { position: 'bottom' }],
    ['FULL_SCREEN', FullScreenMessage, null],
    ['MIDDLE_BANNER', BannerMessage, { position: 'middle' }],
    ['TOP_BANNER', BannerMessage, { position: 'top' }],
    ['MODAL', ModalMessage, null],
  ])(
    'returns the expected values of Component and props for a %s layout',
    (layout, layoutComponent, layoutProps) => {
      mockUseInAppMessaging.mockReturnValueOnce({
        message: { ...baseMessage, layout },
      });
      const { Component, props } = useMessage({ components, onMessageAction });

      expect(Component).toBe(layoutComponent);
      expect(props).toEqual(
        expect.objectContaining({
          ...layoutProps,
          header,
          layout,
          onClose: expect.any(Function) as TestMessageProps['onClose'],
          onDisplay: expect.any(Function) as TestMessageProps['onDisplay'],
        })
      );
    }
  );

  it('returns the expected values of Component and props for a CAROUSEL layout', () => {
    mockUseInAppMessaging.mockReturnValueOnce({
      components,
      message: carouselMessage,
    });

    const { Component, props } = useMessage({ components, onMessageAction });

    expect(Component).toBe(CarouselMessage);
    expect(props).toEqual(
      expect.objectContaining({
        data: [{ header }, { header: { content: 'header two' } }],
        layout: 'CAROUSEL',
        onClose: expect.any(Function) as TestMessageProps['onClose'],
        onDisplay: expect.any(Function) as TestMessageProps['onDisplay'],
      })
    );
  });

  it.each([
    'BOTTOM_BANNER',
    'CAROUSEL',
    'FULL_SCREEN',
    'MIDDLE_BANNER',
    'TOP_BANNER',
    'MODAL',
  ])('gracefully handles an empty content prop for a %s layout', (layout) => {
    mockUseInAppMessaging.mockReturnValueOnce({
      components,
      message: { content: undefined, layout },
    });

    const { props } = useMessage({ components, onMessageAction });

    expect(props).toEqual(
      expect.objectContaining({
        layout,
        onClose: expect.any(Function) as TestMessageProps['onClose'],
        onDisplay: expect.any(Function) as TestMessageProps['onDisplay'],
      })
    );
  });

  it('returns the expected values of Component and props when message is null', () => {
    mockUseInAppMessaging.mockReturnValueOnce({
      components,
      message: null,
    });

    const { Component, props } = useMessage({ components, onMessageAction });

    expect(Component).toBe(RenderNothing);
    expect(props).toBe(EMPTY_PROPS);
  });

  it('returns the expected values of Component and props when a message layout is not supported', () => {
    const layout = 'NOT_A_SUPPORTED_LAYOUT';
    mockUseInAppMessaging.mockReturnValueOnce({
      components,
      message: { layout },
    });

    const { Component, props } = useMessage({ components, onMessageAction });

    expect(infoSpy).toHaveBeenCalledWith(
      `Received unknown InAppMessage layout: ${layout}`
    );
    expect(infoSpy).toHaveBeenCalledTimes(1);
    expect(Component).toBe(RenderNothing);
    expect(props).toBe(EMPTY_PROPS);
  });

  describe('event handling', () => {
    const message = {
      content: [{ primaryButton: { action: 'CLOSE', title: 'primary' } }],
      layout: 'TOP_BANNER',
    };

    beforeEach(() => {
      jest.clearAllMocks();

      mockUseInAppMessaging.mockReturnValueOnce({
        clearMessage: mockClearMessage,
        components,
        message,
      });
    });

    describe('onClose', () => {
      it('calls the expected methods', () => {
        const { props } = useMessage({ components, onMessageAction });

        (props as { onClose: () => void }).onClose();

        expect(notifyMessageInteractionSpy).toHaveBeenCalledTimes(1);
        expect(notifyMessageInteractionSpy).toHaveBeenCalledWith(
          message,
          InAppMessageInteractionEvent.MESSAGE_DISMISSED
        );
        expect(mockClearMessage).toHaveBeenCalledTimes(1);
      });
    });

    describe('onDisplay', () => {
      it('calls the expected methods', () => {
        const { props } = useMessage({ components, onMessageAction });

        (props as TestMessageProps).onDisplay();

        expect(notifyMessageInteractionSpy).toHaveBeenCalledTimes(1);
        expect(notifyMessageInteractionSpy).toHaveBeenCalledWith(
          message,
          InAppMessageInteractionEvent.MESSAGE_DISPLAYED
        );
      });
    });

    describe('onActionCallback', () => {
      it('calls the expected methods via the onPress function of the primary button', () => {
        const { props } = useMessage({ components, onMessageAction });

        (
          props as Required<BannerMessageCommonProps<TestStyle>>
        ).primaryButton.onAction();

        jest.runAllTimers();

        expect(notifyMessageInteractionSpy).toHaveBeenCalledTimes(1);
        expect(notifyMessageInteractionSpy).toHaveBeenCalledWith(
          message,
          InAppMessageInteractionEvent.MESSAGE_ACTION_TAKEN
        );
        expect(mockClearMessage).toHaveBeenCalledTimes(1);
      });
    });
  });
});
