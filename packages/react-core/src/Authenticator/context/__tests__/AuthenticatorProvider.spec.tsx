import React from 'react';
import TestRenderer, { ReactTestRenderer } from 'react-test-renderer';

import { useAuthenticator } from '../../hooks';
import { AuthenticatorProvider } from '..';

function RenderNothing<P = {}>(_: P) {
  return null;
}
const TestComponent = () => {
  const props = useAuthenticator();
  return <RenderNothing {...props} />;
};

describe('AuthenticatorProvider', () => {
  let renderer: ReactTestRenderer;

  beforeEach(() => {
    TestRenderer.act(() => {
      renderer = TestRenderer.create(
        <AuthenticatorProvider>
          <TestComponent />
        </AuthenticatorProvider>
      );
    });
  });

  it('exposes the initial expected context values', () => {
    expect(renderer.root.findByType(RenderNothing).props).toContain({
      services: expect.anything(),
    });
  });
});
