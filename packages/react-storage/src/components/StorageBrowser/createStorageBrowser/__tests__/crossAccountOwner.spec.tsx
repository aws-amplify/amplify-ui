import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import { list } from '../../storage-internal';
import type { ListLocationsOutput, LocationData } from '../../actions';
import type {
  StorageBrowserEventValue,
  StorageBrowserValue,
} from '../../store';

import createStorageBrowser from '../createStorageBrowser';

jest.mock('../../storage-internal', () => ({
  ...jest.requireActual<object>('../../storage-internal'),
  list: jest.fn(),
}));

const adapterAccountId = '012345678901';
const ownerAccountId = '111122223333';

const crossAccountLocation: LocationData = {
  bucket: 'cross-account-bucket',
  id: 'cross-account-id',
  ownerAccountId,
  permissions: ['get', 'list'],
  prefix: 'shared/',
  type: 'PREFIX',
};

const listLocations = jest.fn(
  (): Promise<ListLocationsOutput> =>
    Promise.resolve({ items: [crossAccountLocation], nextToken: undefined })
);

const config = {
  accountId: adapterAccountId,
  getLocationCredentials: jest.fn(() =>
    Promise.resolve({
      credentials: {
        accessKeyId: 'accessKeyId',
        secretAccessKey: 'secretAccessKey',
        sessionToken: 'sessionToken',
        expiration: new Date(Date.now() + 60 * 60 * 1000),
      },
    })
  ),
  listLocations,
  region: 'us-east-1',
  registerAuthListener: jest.fn(),
};

const mockList = jest.mocked(list);

// every `list` call made for the cross-account bucket must send its owner
const expectAllListCallsToUseOwner = () => {
  expect(mockList).toHaveBeenCalled();
  mockList.mock.calls.forEach(([input]) => {
    expect(input.options?.expectedBucketOwner).toBe(ownerAccountId);
  });
};

describe('StorageBrowser cross-account `expectedBucketOwner`', () => {
  beforeAll(() => {
    let id = 0;
    Object.defineProperty(globalThis, 'crypto', {
      value: { randomUUID: () => `uuid-${++id}` },
    });
  });

  beforeEach(() => {
    mockList.mockResolvedValue({
      items: [
        {
          path: 'shared/nested/',
          size: 0,
          lastModified: new Date(),
          eTag: 'etag',
        },
      ],
      nextToken: undefined,
    } as Awaited<ReturnType<typeof list>>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('sends the location owner when opening a location from the locations list', async () => {
    const { StorageBrowser } = createStorageBrowser({ config });

    render(<StorageBrowser />);

    const locationButton = await screen.findByRole('button', {
      name: /shared\//,
    });

    act(() => {
      fireEvent.click(locationButton);
    });

    await waitFor(() => {
      expect(mockList).toHaveBeenCalled();
    });

    expectAllListCallsToUseOwner();
  });

  it('sends the location owner after navigating back with the location breadcrumb', async () => {
    const { StorageBrowser } = createStorageBrowser({ config });

    render(
      <StorageBrowser
        defaultValue={{
          location: { ...crossAccountLocation, path: 'nested/' },
        }}
      />
    );

    await waitFor(() => {
      expect(mockList).toHaveBeenCalled();
    });

    mockList.mockClear();

    // the breadcrumb for the location itself, above `nested/`
    const breadcrumb = await screen.findByRole('button', {
      name: /cross-account-bucket/,
    });

    act(() => {
      fireEvent.click(breadcrumb);
    });

    await waitFor(() => {
      expect(mockList).toHaveBeenCalled();
    });

    expectAllListCallsToUseOwner();
  });

  it('sends the location owner in controlled mode, including after navigation', async () => {
    const { StorageBrowser } = createStorageBrowser({ config });
    const emitted: StorageBrowserEventValue[] = [];

    const Controlled = () => {
      const [value, setValue] = React.useState<StorageBrowserValue>({
        location: { ...crossAccountLocation, path: 'nested/' },
      });

      return (
        <StorageBrowser
          value={value}
          onValueChange={(next) => {
            emitted.push(next);
            setValue(next);
          }}
        />
      );
    };

    render(<Controlled />);

    await waitFor(() => {
      expect(mockList).toHaveBeenCalled();
    });

    expectAllListCallsToUseOwner();
    mockList.mockClear();

    const breadcrumb = await screen.findByRole('button', {
      name: /cross-account-bucket/,
    });

    act(() => {
      fireEvent.click(breadcrumb);
    });

    await waitFor(() => {
      expect(mockList).toHaveBeenCalled();
    });

    // the round-trip through `onValueChange` -> `value` keeps the owner
    expect(emitted.at(-1)?.location?.ownerAccountId).toBe(ownerAccountId);
    expectAllListCallsToUseOwner();
  });
});
