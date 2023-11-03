import React from 'react';
import { render } from '@testing-library/react';

import { RenderNothing } from '@aws-amplify/ui-react-core';

import { useCustomComponents } from '../useCustomComponents';

const TestComponent = () => {
  const props = useCustomComponents();
  return <RenderNothing {...props} />;
};

describe('useCustomComponents', () => {
  it('throws an error when called outside a Provider', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow();

    consoleErrorSpy.mockRestore();
  });
});
