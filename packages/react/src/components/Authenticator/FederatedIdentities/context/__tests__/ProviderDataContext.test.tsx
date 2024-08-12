import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import {
  ProviderDataProvider,
  useProviderDataContext,
} from '../ProviderDataContext';

describe('useProviderDataContext', () => {
  const PROVIDER_DATA = {
    displayName: 'Test Provider',
    icon: 'google',
    providerName: 'testProvider',
  };

  it('should return the correct provider data', () => {
    const wrapper = ({ children }) => (
      <ProviderDataProvider providerData={PROVIDER_DATA}>
        {children}
      </ProviderDataProvider>
    );

    const { result } = renderHook(() => useProviderDataContext(), { wrapper });

    expect(result.current).toEqual(PROVIDER_DATA);
  });

  it('should throw an error if provider data is not provided', () => {
    const { result } = renderHook(() => useProviderDataContext());

    expect(() => result.current).toThrow();
  });
});
