import React from 'react';
import { render } from '@testing-library/react';
import { Amplify } from 'aws-amplify';

import { createStorageBrowser } from '../createStorageBrowser';
import * as CreateAmplifyAuthAdapter from '../adapters/createAmplifyAuthAdapter';
import { StorageBrowserDisplayText } from '../displayText/types';

import { StorageBrowser } from '../StorageBrowserAmplify';

jest.mock('../createStorageBrowser');

const TestComponent = jest.fn(() => 'StorageBrowser');

const createStorageBrowserMock = (
  createStorageBrowser as jest.Mock
).mockReturnValue({ StorageBrowser: TestComponent });

jest.spyOn(Amplify, 'getConfig').mockReturnValue({
  Storage: { S3: { bucket: 'XXXXXX', region: 'region' } },
});

const createAmplifyAuthAdapterSpy = jest.spyOn(
  CreateAmplifyAuthAdapter,
  'createAmplifyAuthAdapter'
);

describe('StorageBrowser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls `createStorageBrowser` and `createAmplifyAuthAdapter`', () => {
    render(<StorageBrowser />);

    expect(createStorageBrowserMock).toHaveBeenCalledTimes(1);
    expect(createStorageBrowserMock).toHaveBeenCalledWith({
      config: expect.anything(),
    });

    expect(createAmplifyAuthAdapterSpy).toHaveBeenCalledTimes(1);
  });

  it('provides the expected props to the `StorageBrowser` returned from `createStorageBrowser`', () => {
    const displayText: StorageBrowserDisplayText = {
      LocationsView: { title: 'Hello' },
    };

    const views = { LocationsView: jest.fn() };

    render(<StorageBrowser displayText={displayText} views={views} />);

    expect(TestComponent).toHaveBeenCalledWith({ displayText, views }, {});
  });
});
