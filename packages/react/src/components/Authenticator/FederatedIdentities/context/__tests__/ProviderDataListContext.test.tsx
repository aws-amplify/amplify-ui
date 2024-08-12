import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import {
  ProviderDataListProvider,
  useProviderDataListContext,
} from '../ProviderDataListContext';
import { ProviderData } from '../../controls/types';

describe('useProviderDataContext', () => {
  const PROVIDER_DATA_LIST: ProviderData[] = [
    { providerName: 'amazon', displayName: 'Amazon', icon: 'amazon' },
    { providerName: 'facebook', displayName: 'Facebook', icon: 'facebook' },
    { providerName: 'apple', displayName: 'Apple', icon: 'apple' },
    { providerName: 'google', displayName: 'Google', icon: 'google' },
    { providerName: 'OktaClient', displayName: 'Okta', icon: <svg></svg> },
  ];

  it('should return the correct provider data list', () => {
    const wrapper = ({ children }) => (
      <ProviderDataListProvider providerDataList={PROVIDER_DATA_LIST}>
        {children}
      </ProviderDataListProvider>
    );

    const { result } = renderHook(() => useProviderDataListContext(), {
      wrapper,
    });

    expect(result.current).toEqual(PROVIDER_DATA_LIST);
  });

  it('should throw an error if provider data list is not provided', () => {
    const { result } = renderHook(() => useProviderDataListContext());

    expect(() => result.current).toThrow(
      'ProviderDataList context does not exist'
    );
  });
});
