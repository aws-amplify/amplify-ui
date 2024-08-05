import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import { FederatedProvider } from '@aws-amplify/ui';
import {
  ProviderType,
  ProviderData,
  FederatedProviderList,
} from '../../controls/types';
import {
  useProviderDataList,
  ProviderDataListProvider,
} from '../ProviderDataListContext';

describe('ProviderDataListContext', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should turn supported providers into ProviderData objects', () => {
    const providerTypeList: ProviderType[] = [
      ...(FederatedProviderList as FederatedProvider[]),
      { providerName: 'OktaClient', displayName: 'Okta', icon: <svg></svg> },
    ];

    const wrapper = (providerTypeList: ProviderType[]) => {
      return ({ children }: { children?: React.ReactNode }) => (
        <ProviderDataListProvider providerTypes={providerTypeList}>
          {children}
        </ProviderDataListProvider>
      );
    };

    const { result } = renderHook(() => useProviderDataList(), {
      wrapper: wrapper(providerTypeList),
    });

    const expectedProviderData: ProviderData[] = [
      { providerName: 'Amazon', displayName: 'Amazon', icon: 'amazon' },
      { providerName: 'Facebook', displayName: 'Facebook', icon: 'facebook' },
      { providerName: 'Apple', displayName: 'Apple', icon: 'apple' },
      { providerName: 'Google', displayName: 'Google', icon: 'google' },
      { providerName: 'OktaClient', displayName: 'Okta', icon: <svg></svg> },
    ];

    expect(result.current).toEqual(expectedProviderData);
  });

  it('should fail for duplicate supported provider names', async () => {
    const providerTypeList: ProviderType[] = ['amazon', 'facebook', 'amazon'];

    expect(() =>
      render(<ProviderDataListProvider providerTypes={providerTypeList} />)
    ).toThrow('Duplicate provider name found: amazon');
  });

  it('should fail for duplicate custom provider names', () => {
    const providerTypeList: ProviderType[] = [
      'amazon',
      'facebook',
      { providerName: 'OktaClient', displayName: 'Okta', icon: <svg></svg> },
      {
        providerName: 'OktaClient',
        displayName: 'Okta Duplicate',
        icon: <svg></svg>,
      },
    ];

    expect(() =>
      render(<ProviderDataListProvider providerTypes={providerTypeList} />)
    ).toThrow('Duplicate provider name found: OktaClient');
  });

  it('should fail for duplicate provider names between social and custom data', () => {
    const providerTypeList: ProviderType[] = [
      'amazon',
      'facebook',
      {
        providerName: 'facebook',
        displayName: 'Facebook Custom',
        icon: 'facebook',
      },
    ];

    expect(() =>
      render(<ProviderDataListProvider providerTypes={providerTypeList} />)
    ).toThrow('Duplicate provider name found: facebook');
  });
});
