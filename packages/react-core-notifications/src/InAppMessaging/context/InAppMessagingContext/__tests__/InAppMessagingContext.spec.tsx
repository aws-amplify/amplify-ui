import React from 'react';
import { renderHook } from '@testing-library/react';

import { InAppMessagingContextType } from '..';

import {
  ERROR_MESSAGE,
  InAppMessagingProvider,
  useInAppMessaging,
} from '../InAppMessagingContext';

const clearMessage = jest.fn();
const displayMessage = jest.fn();
const message = null;

jest.mock('../useInAppMessagingState', () => ({
  useInAppMessagingState: (): InAppMessagingContextType => ({
    clearMessage,
    displayMessage,
    message,
  }),
}));

jest.mock('aws-amplify/in-app-messaging');

describe('useInAppMessaging', () => {
  it('provides the values of InAppMessagingContext to consumers wrapped in InAppMessagingProvider', () => {
    const { result } = renderHook(() => useInAppMessaging(), {
      wrapper: ({ children }) => (
        <InAppMessagingProvider>{children}</InAppMessagingProvider>
      ),
    });

    expect(result.current).toStrictEqual({
      clearMessage,
      displayMessage,
      message,
    });
  });

  it('throws an error when called outside an InAppMessagingProvider', () => {
    /* eslint-disable no-console */
    // monkeypatch console.error into a no-op temporarily to supress React printed error regarding lack of
    // ErrorBoundary component
    const original = console.error;
    console.error = () => {};

    expect(() => renderHook(() => useInAppMessaging())).toThrow(ERROR_MESSAGE);

    console.error = original;
    /* eslint-enable no-console */
  });
});
