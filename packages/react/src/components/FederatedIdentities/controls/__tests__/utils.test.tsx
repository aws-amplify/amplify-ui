import React from 'react';
import { FederatedProvider } from '@aws-amplify/ui';
import { ProviderType, ProviderData, DefaultFederatedProviderList } from '..';
import { toProviderData } from '../utils';
import { getProviderConfig } from '../utils';

describe('getProviderConfig', () => {
  const mockResourcesConfig = {
    Auth: {
      Cognito: {
        loginWith: {
          oauth: {
            providers: ['Google', 'Facebook', 'Amazon'],
          },
        },
      },
    },
  };

  const messyConfig = {
    Auth: {
      Cognito: {
        loginWith: {
          oauth: {
            providers: ['Google', 'okta', { custom: 'okta' }],
          },
        },
      },
    },
  };

  const emptyConfig = {};

  const configWithoutProviders = {
    Auth: {
      Cognito: {
        loginWith: {
          oauth: {
            providers: null,
          },
        },
      },
    },
  };

  it('returns a list of supported providers in lowercase', () => {
    const result = getProviderConfig(mockResourcesConfig);

    expect(result).toEqual([
      'google',
      'facebook',
      'amazon',
    ] as FederatedProvider[]);
  });

  it('returns a list of supported providers in lowercase if there is unuseful information in config', () => {
    const result = getProviderConfig(messyConfig);

    expect(result).toEqual(['google'] as FederatedProvider[]);
  });

  it('returns an empty array if providers are null', () => {
    const result = getProviderConfig(configWithoutProviders);
    expect(result).toEqual([]);
  });

  it('returns an empty array if Auth.Cognito.loginWith.oauth is missing', () => {
    const result = getProviderConfig(emptyConfig);
    expect(result).toEqual([]);
  });

  it('works with generic config input', () => {
    const genericConfig = {
      someKey: 'someValue',
    };

    const result = getProviderConfig(genericConfig);
    expect(result).toEqual([]);
  });
});

describe('toProviderData utility', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
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

  it('should throw an error for duplicate supported provider names', () => {
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
