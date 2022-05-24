import React from 'react';
import TestRenderer, { ReactTestRenderer } from 'react-test-renderer';
import { Notifications } from '@aws-amplify/notifications';

import { useInAppMessaging } from '../../../hooks/useInAppMessaging';
import { InAppMessagingContextType } from '../..';
import InAppMessagingProvider from '../InAppMessagingProvider';

jest.mock('@aws-amplify/notifications', () => ({
  ...jest.requireActual('@aws-amplify/notifications'),
  Notifications: { InAppMessaging: { onMessageReceived: jest.fn() } },
}));

const { InAppMessaging } = Notifications;

let onMessageReceivedCallback =
  null as unknown as InAppMessagingContextType['displayInAppMessage'];

const mockRemove = jest.fn(() => {
  onMessageReceivedCallback =
    null as unknown as InAppMessagingContextType['displayInAppMessage'];
});

const mockOnMessageReceived = (
  callback: InAppMessagingContextType['displayInAppMessage']
) => {
  onMessageReceivedCallback = callback;
  return { remove: mockRemove };
};

function ChildComponent<P = unknown>(_: P) {
  return null;
}
const TestComponent = () => {
  const props = useInAppMessaging();
  return <ChildComponent {...props} />;
};

const message = { layout: 'TOP_BANNER' as const, id: '0', content: [] };

describe('InAppMessagingProvider', () => {
  let renderer: ReactTestRenderer;

  beforeEach(() => {
    jest.resetAllMocks();

    (InAppMessaging.onMessageReceived as jest.Mock).mockImplementation(
      mockOnMessageReceived
    );

    TestRenderer.act(() => {
      renderer = TestRenderer.create(
        <InAppMessagingProvider>
          <TestComponent />
        </InAppMessagingProvider>
      );
    });
  });

  it('vends the expected initial context values', () => {
    const expectedProps = {
      clearInAppMessage: expect.any(
        Function
      ) as InAppMessagingContextType['clearInAppMessage'],
      displayInAppMessage: expect.any(
        Function
      ) as InAppMessagingContextType['displayInAppMessage'],
      inAppMessage: null,
      style: undefined,
    };

    expect(renderer.root.findByType(ChildComponent).props).toEqual(
      expectedProps
    );
  });

  it('registers a listener to InAppMessaging.onMessageReceived as expected', () => {
    expect(InAppMessaging.onMessageReceived).toBeCalledTimes(1);
    expect(InAppMessaging.onMessageReceived).toBeCalledWith(
      expect.any(Function) as InAppMessagingContextType['displayInAppMessage']
    );
  });

  it('updates the value of inAppMessage when the listener registered to InAppMessaging.onMessageReceived is called', () => {
    TestRenderer.act(() => {
      onMessageReceivedCallback(message);
    });

    const consumer = renderer.root.findByType(ChildComponent);

    expect(
      (consumer.props as InAppMessagingContextType).inAppMessage
    ).toStrictEqual(message);
  });

  it('removes the listener registered to InAppMessaging.onMessageReceived as expected', () => {
    TestRenderer.act(() => {
      renderer.unmount();
    });

    expect(mockRemove).toBeCalledTimes(1);
  });

  it('updates the value of inAppMessage when displayInAppMessage is called', () => {
    const consumer = renderer.root.findByType(ChildComponent);

    TestRenderer.act(() => {
      (
        consumer.props
          .displayInAppMessage as InAppMessagingContextType['displayInAppMessage']
      )(message);
    });

    expect(
      (consumer.props as InAppMessagingContextType).inAppMessage
    ).toStrictEqual(message);
  });

  it('updates the value of inAppMessage when clearInAppMessage is called', () => {
    const consumer = renderer.root.findByType(ChildComponent);

    TestRenderer.act(() => {
      (consumer.props as InAppMessagingContextType).displayInAppMessage(
        message
      );
    });

    expect(consumer.props.inAppMessage).not.toBeNull();

    TestRenderer.act(() => {
      (consumer.props as InAppMessagingContextType).clearInAppMessage();
    });

    expect(consumer.props.inAppMessage).toBeNull();
  });
});
