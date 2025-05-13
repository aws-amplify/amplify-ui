import { render } from '@testing-library/react';
import React from 'react';

import { ActionConfigsProvider, getActionConfigs } from '../../actions';
import { ComponentsProvider } from '../../components';
import { createConfigurationProvider } from '../../configuration';
import { DisplayTextProvider } from '../../displayText';
import { FileItemsProvider } from '../../fileItems';
import { LocationItemsProvider } from '../../locationItems';
import { StoreProvider } from '../../store';
import { ActionHandlersProvider, getActionHandlers } from '../../useAction';
import { ViewsProvider } from '../../views';

import { StorageBrowserProviderProps } from '../types';
import createProvider from '../createProvider';

jest.mock('../../actions');
jest.mock('../../components');
jest.mock('../../displayText');
jest.mock('../../fileItems');
jest.mock('../../locationItems');
jest.mock('../../configuration');
jest.mock('../../store');
jest.mock('../../useAction');
jest.mock('../../views');

const mockActionConfigsProvider = jest
  .mocked(ActionConfigsProvider)
  // @ts-expect-error has return type of `React.ComponentType` requiring extraneous casting
  .mockImplementation(({ children }) => <>{children}</>);
const mockComponentsProvider = jest
  .mocked(ComponentsProvider)
  .mockImplementation(({ children }) => <>{children}</>);
const mockDisplayTextProvider = jest
  .mocked(DisplayTextProvider)
  .mockImplementation(({ children }) => <>{children}</>);
const mockFileItemsProvider = jest
  .mocked(FileItemsProvider)
  .mockImplementation(({ children }) => <>{children}</>);
const mockLocationItemsProvider = jest
  .mocked(LocationItemsProvider)
  .mockImplementation(({ children }) => <>{children}</>);
const mockStoreProvider = jest
  .mocked(StoreProvider)
  .mockImplementation(({ children }) => <>{children}</>);
const mockActionHandlersProvider = jest
  .mocked(ActionHandlersProvider)
  // @ts-expect-error has return type of `React.ComponentType` requiring extraneous casting
  .mockImplementation(({ children }) => <>{children}</>);
const mockViewsProvider = jest
  .mocked(ViewsProvider)
  .mockImplementation(({ children }) => <>{children}</>);

// @ts-expect-error missing `displayName`
const mockConfigurationProvider: ReturnType<
  typeof createConfigurationProvider
> = jest.fn(({ children }) => <>{children}</>);
const mockCreateConfigurationProvider = jest
  .mocked(createConfigurationProvider)
  .mockReturnValue(mockConfigurationProvider);

const mockGetActionConfigs = jest.mocked(getActionConfigs);
const mockGetActionHandlers = jest.mocked(getActionHandlers);

const mockConfig = {
  accountId: '012345678901',
  customEndpoint: 'mock-endpoint',
  getLocationCredentials: jest.fn(),
  region: 'region',
  registerAuthListener: jest.fn(),
};

describe('createProvider', () => {
  it('provides the expected props to nested context providers', () => {
    const location: StorageBrowserProviderProps['location'] = {
      bucket: '',
      id: '',
      permissions: [],
      prefix: '',
      type: 'BUCKET',
    };

    // contrived `props` for testing only
    const storeProps = {
      defaultValue: null,
      onValueChange: jest.fn(),
      value: null,
      actionType: '',
      location,
    };

    const displayText = {};
    const views = {};

    const props: StorageBrowserProviderProps = {
      ...storeProps,
      displayText,
      views,
    };

    const mockActionConfigs = {};
    mockGetActionConfigs.mockReturnValue(mockActionConfigs);

    const mockActionHandlers = {};
    mockGetActionHandlers.mockReturnValue(mockActionHandlers);

    const mockFileValidator = jest.fn();

    const Provider = createProvider({
      config: { ...mockConfig, listLocations: jest.fn() },
      options: { validateFile: mockFileValidator },
    });

    // used to validate props passed to `ViewsProvider`
    const mockResolvedActions = mockGetActionHandlers.mock.calls[0][0];

    expect(mockCreateConfigurationProvider).toHaveBeenCalledTimes(1);
    expect(mockCreateConfigurationProvider).toHaveBeenCalledWith({
      ...mockConfig,
      displayName: 'ConfigurationProvider',
    });

    expect(mockGetActionConfigs).toHaveBeenCalledTimes(1);

    render(<Provider {...props} />);

    expect(mockStoreProvider).toHaveBeenCalledTimes(1);
    expect(mockStoreProvider).toHaveBeenCalledWith(
      expect.objectContaining(storeProps),
      {}
    );

    expect(mockConfigurationProvider).toHaveBeenCalledTimes(1);

    expect(mockActionConfigsProvider).toHaveBeenCalledTimes(1);
    expect(mockActionConfigsProvider).toHaveBeenCalledWith(
      expect.objectContaining({ actionConfigs: mockActionConfigs }),
      {}
    );

    expect(mockActionHandlersProvider).toHaveBeenCalledTimes(1);
    expect(mockActionHandlersProvider).toHaveBeenCalledWith(
      expect.objectContaining(mockActionHandlers),
      {}
    );

    expect(mockDisplayTextProvider).toHaveBeenCalledTimes(1);
    expect(mockDisplayTextProvider).toHaveBeenCalledWith(
      expect.objectContaining({ displayText }),
      {}
    );

    expect(mockViewsProvider).toHaveBeenCalledTimes(1);
    expect(mockViewsProvider).toHaveBeenCalledWith(
      expect.objectContaining({ actions: mockResolvedActions, views }),
      {}
    );

    expect(mockComponentsProvider).toHaveBeenCalledTimes(1);
    expect(mockComponentsProvider).toHaveBeenCalledWith(
      expect.objectContaining({ composables: expect.anything() }),
      {}
    );

    expect(mockFileItemsProvider).toHaveBeenCalledTimes(1);
    expect(mockFileItemsProvider).toHaveBeenCalledWith(
      expect.objectContaining({ validateFile: mockFileValidator }),
      {}
    );

    expect(mockLocationItemsProvider).toHaveBeenCalledTimes(1);
  });
});
