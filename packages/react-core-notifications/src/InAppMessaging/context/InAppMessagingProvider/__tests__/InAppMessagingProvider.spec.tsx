import React from 'react';
import TestRenderer, { ReactTestRenderer } from 'react-test-renderer';
import { onMessageReceived } from 'aws-amplify/in-app-messaging';
import { RenderNothing } from '@aws-amplify/ui-react-core';

import { useInAppMessaging } from '../../../hooks/useInAppMessaging';
import { InAppMessagingContextType } from '../..';
import { InAppMessagingProvider } from '..';

jest.mock('aws-amplify/in-app-messaging', () => ({
  ...jest.requireActual('aws-amplify/in-app-messaging'),
  onMessageReceived: jest.fn(),
}));

let onMessageReceivedCallback =
  null as unknown as InAppMessagingContextType['displayMessage'];

const mockRemove = jest.fn(() => {
  onMessageReceivedCallback =
    null as unknown as InAppMessagingContextType['displayMessage'];
});

const mockOnMessageReceived = (
  callback: InAppMessagingContextType['displayMessage']
) => {
  onMessageReceivedCallback = callback;
  return { remove: mockRemove };
};

const TestComponent = () => {
  const props = useInAppMessaging();
  return <RenderNothing {...props} />;
};

const message = { layout: 'TOP_BANNER' as const, id: '0', content: [] };

describe('InAppMessagingProvider', () => {
  let renderer: ReactTestRenderer;

  beforeEach(() => {
    jest.resetAllMocks();

    (onMessageReceived as jest.Mock).mockImplementation(mockOnMessageReceived);

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
      clearMessage: expect.any(
        Function
      ) as InAppMessagingContextType['clearMessage'],
      displayMessage: expect.any(
        Function
      ) as InAppMessagingContextType['displayMessage'],
      message: null,
      style: undefined,
    };

    expect(renderer.root.findByType(RenderNothing).props).toEqual(
      expectedProps
    );
  });

  it('registers a listener to InAppMessaging.onMessageReceived as expected', () => {
    expect(onMessageReceived).toBeCalledTimes(1);
    expect(onMessageReceived).toBeCalledWith(
      expect.any(Function) as InAppMessagingContextType['displayMessage']
    );
  });

  it('updates the value of message when the listener registered to InAppMessaging.onMessageReceived is called', () => {
    TestRenderer.act(() => {
      onMessageReceivedCallback(message);
    });

    const consumer = renderer.root.findByType(RenderNothing);

    expect((consumer.props as InAppMessagingContextType).message).toStrictEqual(
      message
    );
  });

  it('removes the listener registered to InAppMessaging.onMessageReceived as expected', () => {
    TestRenderer.act(() => {
      renderer.unmount();
    });

    expect(mockRemove).toBeCalledTimes(1);
  });

  it('updates the value of message when displayMessage is called', () => {
    const consumer = renderer.root.findByType(RenderNothing);

    TestRenderer.act(() => {
      (
        consumer.props
          .displayMessage as InAppMessagingContextType['displayMessage']
      )(message);
    });

    expect((consumer.props as InAppMessagingContextType).message).toStrictEqual(
      message
    );
  });

  it('updates the value of message when clearMessage is called', () => {
    const consumer = renderer.root.findByType(RenderNothing);

    TestRenderer.act(() => {
      (consumer.props as InAppMessagingContextType).displayMessage(message);
    });

    expect(consumer.props.message).not.toBeNull();

    TestRenderer.act(() => {
      (consumer.props as InAppMessagingContextType).clearMessage();
    });

    expect(consumer.props.message).toBeNull();
  });
});
