import React from 'react';
import { FederatedProvider } from '@aws-amplify/ui';
import {
  ProviderType,
  ProviderData,
  DefaultFederatedProviderList,
} from '../../controls/types';
import { toProviderData } from '../FederatedIdentitiesControl';

describe('toProviderData utility', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should turn supported providers into ProviderData objects', () => {
    const providerTypeList: ProviderType[] = [
      ...(DefaultFederatedProviderList as FederatedProvider[]),
      { providerName: 'OktaClient', displayName: 'Okta', icon: <svg></svg> },
    ];

    const providerDataList = toProviderData(providerTypeList);

    const expectedProviderData: ProviderData[] = [
      { providerName: 'amazon', displayName: 'Amazon', icon: 'amazon' },
      { providerName: 'facebook', displayName: 'Facebook', icon: 'facebook' },
      { providerName: 'apple', displayName: 'Apple', icon: 'apple' },
      { providerName: 'google', displayName: 'Google', icon: 'google' },
      { providerName: 'OktaClient', displayName: 'Okta', icon: <svg></svg> },
    ];

    expect(providerDataList).toEqual(expectedProviderData);
  });

  it('should throw an error for duplicate supported provider names', async () => {
    const providerTypeList: ProviderType[] = ['amazon', 'facebook', 'amazon'];

    expect(() => toProviderData(providerTypeList)).toThrow(
      'Duplicate provider name found: amazon'
    );
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

    expect(() => toProviderData(providerTypeList)).toThrow(
      'Duplicate provider name found: OktaClient'
    );
  });

  it('should throw an error for duplicate provider names between social and custom data', () => {
    const providerTypeList: ProviderType[] = [
      'amazon',
      'facebook',
      {
        providerName: 'facebook',
        displayName: 'Facebook Custom',
        icon: 'facebook',
      },
    ];

    expect(() => toProviderData(providerTypeList)).toThrow(
      'Duplicate provider name found: facebook'
    );
  });
});
