import {
  InAppMessage,
  InAppMessageInteractionEvent,
  Notifications,
} from '@aws-amplify/notifications';
import { ConsoleLogger as Logger } from '@aws-amplify/core';

import { useInAppMessaging } from '../../useInAppMessaging';
import { BannerMessageCommonProps, MessageCommonProps } from '../../../types';
import { UseMessageParams } from '../types';

import useMessage from '../useMessage';

const notifyMessageInteractionSpy = jest.spyOn(
  Notifications.InAppMessaging,
  'notifyMessageInteraction'
);

jest.mock('../../useInAppMessaging');
jest.useFakeTimers();

type TestStyle = void;
type TestMessageProps = Required<MessageCommonProps<TestStyle>>;

const infoSpy = jest.spyOn(Logger.prototype, 'info');

const mockUseInAppMessaging = useInAppMessaging as jest.Mock;
const mockClearInAppMessage = jest.fn();

const header = { content: 'header one' };
const baseInAppMessage: Partial<InAppMessage> = {
  id: 'test',
  content: [{ header }],
};
const carouselInAppMessage: Partial<InAppMessage> = {
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
        inAppMessage: { ...baseInAppMessage, layout },
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
          style: undefined,
        })
      );
    }
  );

  it('returns the expected values of Component and props for a CAROUSEL layout', () => {
    mockUseInAppMessaging.mockReturnValueOnce({
      components: {},
      inAppMessage: carouselInAppMessage,
    });

    const { Component, props } = useMessage({ components, onMessageAction });

    expect(Component).toBe(CarouselMessage);
    expect(props).toEqual(
      expect.objectContaining({
        data: [{ header }, { header: { content: 'header two' } }],
        layout: 'CAROUSEL',
        onClose: expect.any(Function) as TestMessageProps['onClose'],
        onDisplay: expect.any(Function) as TestMessageProps['onDisplay'],
        style: undefined,
      })
    );
  });

  it('returns null values for Component and props when inAppMessage is null', () => {
    mockUseInAppMessaging.mockReturnValueOnce({
      components: {},
      inAppMessage: null,
    });

    const { Component, props } = useMessage({ components, onMessageAction });

    expect(Component).toBeNull();
    expect(props).toBeNull();
  });

  it('returns null values for Component and props when inAppMessage.layout is not supported', () => {
    const layout = 'NOT_A_SUPPORTED_LAYOUT';
    mockUseInAppMessaging.mockReturnValueOnce({
      components: {},
      inAppMessage: { layout },
    });

    const { Component, props } = useMessage({ components, onMessageAction });

    expect(infoSpy).toHaveBeenCalledWith(
      `Received unknown InAppMessage layout: ${layout}`
    );
    expect(infoSpy).toHaveBeenCalledTimes(1);
    expect(Component).toBeNull();
    expect(props).toBeNull();
  });

  describe('event handling', () => {
    const inAppMessage = {
      content: [{ primaryButton: { action: 'CLOSE', title: 'primary' } }],
      layout: 'TOP_BANNER',
    };

    beforeEach(() => {
      jest.clearAllMocks();

      mockUseInAppMessaging.mockReturnValueOnce({
        clearInAppMessage: mockClearInAppMessage,
        components: {},
        inAppMessage,
      });
    });

    describe('onClose', () => {
      it('calls the expected methods', () => {
        const { props } = useMessage({ components, onMessageAction });

        (props as { onClose: () => void }).onClose();

        expect(notifyMessageInteractionSpy).toHaveBeenCalledTimes(1);
        expect(notifyMessageInteractionSpy).toHaveBeenCalledWith(
          inAppMessage,
          InAppMessageInteractionEvent.MESSAGE_DISMISSED
        );
        expect(mockClearInAppMessage).toHaveBeenCalledTimes(1);
      });
    });

    describe('onDisplay', () => {
      it('calls the expected methods', () => {
        const { props } = useMessage({ components, onMessageAction });

        (props as TestMessageProps).onDisplay();

        expect(notifyMessageInteractionSpy).toHaveBeenCalledTimes(1);
        expect(notifyMessageInteractionSpy).toHaveBeenCalledWith(
          inAppMessage,
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
          inAppMessage,
          InAppMessageInteractionEvent.MESSAGE_ACTION_TAKEN
        );
        expect(mockClearInAppMessage).toHaveBeenCalledTimes(1);
      });
    });
  });
});
