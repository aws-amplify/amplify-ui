import React from 'react';
import { render, renderHook } from '@testing-library/react';

import { useGetActionInput } from '../context';

import { createConfigurationProvider } from '../createConfigurationProvider';

describe('createConfigurationProvider', () => {
  it('returns a `ConfigurationProvider` component', () => {
    const Provider = createConfigurationProvider({
      displayName: 'MyProvider',
      getLocationCredentials: jest.fn(),
      region: 'my-region',
      registerAuthListener: jest.fn(),
    });

    expect(typeof Provider).toBe('function');
    expect(Provider.displayName).toBe('MyProvider');
  });

  it('provides the expected values to consumers', () => {
    const Provider = createConfigurationProvider({
      displayName: 'MyProvider',
      getLocationCredentials: jest.fn(),
      region: 'my-region',
      registerAuthListener: jest.fn(),
    });

    const { result } = renderHook(() => useGetActionInput(), {
      wrapper: Provider,
    });

    const getActionInput = result.current;

    expect(typeof getActionInput).toBe('function');
  });

  it('renders a wrapped `ChildComponent` and passes it any provided `props` as expected', async () => {
    const ChildComponent = ({ testId }: { testId: string }) => (
      <div data-testid={testId} />
    );

    const Provider = createConfigurationProvider({
      displayName: 'MyProvider',
      getLocationCredentials: jest.fn(),
      region: 'my-region',
      registerAuthListener: jest.fn(),
      ChildComponent,
    });

    const id = '🌶️';
    const { findByTestId } = render(<Provider testId={id} />);

    const child = await findByTestId(id);

    expect(child).toBeDefined();
    expect(child).toBeInTheDocument();
  });
});
