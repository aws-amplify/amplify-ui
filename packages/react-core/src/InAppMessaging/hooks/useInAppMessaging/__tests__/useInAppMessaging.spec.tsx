import React from 'react';
import TestRenderer from 'react-test-renderer';
import { RenderNothing } from '../../../../components';

import { useInAppMessaging } from '..';

const TestComponent = () => {
  const props = useInAppMessaging();
  return <RenderNothing {...props} />;
};

describe('useInAppMessaging', () => {
  /* eslint-disable no-console */
  it('throws an error when called outside an InAppMessagingProvider', () => {
    // monkeypatch console.error into a no-op temporarily to supress React printed error regarding lack of
    // ErrorBoundary component
    const original = console.error;
    console.error = () => {};

    expect(() => TestRenderer.create(<TestComponent />)).toThrowError();

    console.error = original;
  });
  /* eslint-enable no-console */
});
