import { renderHook, act } from '@testing-library/react';

import * as InAppModule from 'aws-amplify/in-app-messaging';

import { InAppMessagingContextType } from '../InAppMessagingContext';
import { useInAppMessagingState } from '../useInAppMessagingState';

const onMessageReceivedSpy = jest.spyOn(InAppModule, 'onMessageReceived');

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

const message = { layout: 'TOP_BANNER' as const, id: '0', content: [] };

describe('useInAppMessagingState', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    onMessageReceivedSpy.mockImplementation(mockOnMessageReceived);
  });

  it('vends the expected initial context values', () => {
    const expected = {
      clearMessage: expect.any(
        Function
      ) as InAppMessagingContextType['clearMessage'],
      displayMessage: expect.any(
        Function
      ) as InAppMessagingContextType['displayMessage'],
      message: null,
      style: undefined,
    };

    const { result } = renderHook(() => useInAppMessagingState());

    expect(result.current).toEqual(expected);
  });

  it('registers a listener to InAppMessaging.onMessageReceived as expected', () => {
    renderHook(() => useInAppMessagingState());

    expect(onMessageReceivedSpy).toHaveBeenCalledTimes(1);
    expect(onMessageReceivedSpy).toHaveBeenCalledWith(
      expect.any(Function) as InAppMessagingContextType['displayMessage']
    );
  });

  it('updates the value of message when the listener registered to InAppMessaging.onMessageReceived is called', () => {
    const { result } = renderHook(() => useInAppMessagingState());

    expect(result.current.message).toBeNull();

    act(() => {
      onMessageReceivedCallback(message);
    });

    expect(result.current.message).toStrictEqual(message);
  });

  it('removes the listener registered to InAppMessaging.onMessageReceived as expected', () => {
    const { unmount } = renderHook(() => useInAppMessagingState());

    act(() => {
      unmount();
    });

    expect(mockRemove).toHaveBeenCalledTimes(1);
  });

  it('updates the value of message when displayMessage is called', () => {
    const { result } = renderHook(() => useInAppMessagingState());

    act(() => {
      result.current.displayMessage(message);
    });

    expect(result.current.message).toStrictEqual(message);
  });

  it('updates the value of message when clearMessage is called', () => {
    const { result } = renderHook(() => useInAppMessagingState());

    expect(result.current.message).toBeNull();

    act(() => {
      result.current.displayMessage(message);
    });

    expect(result.current.message).toStrictEqual(message);

    act(() => {
      result.current.clearMessage();
    });

    expect(result.current.message).toBeNull();
  });
});
