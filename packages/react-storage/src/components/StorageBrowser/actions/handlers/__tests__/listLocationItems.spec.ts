import { list } from '../../../storage-internal';

import {
  listLocationItemsHandler,
  ListLocationItemsHandlerInput,
  parseResult,
} from '../listLocationItems';

let uuid = 0;
Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => {
      uuid++;
      return uuid.toString();
    },
  },
});

jest.mock('../../../storage-internal');

const baseInput: ListLocationItemsHandlerInput = {
  prefix: 'prefix/',
  config: {
    accountId: '012345678901',
    bucket: 'bucket',
    customEndpoint: 'mock-endpoint',
    credentials: jest.fn(),
    region: 'region',
  },
};

const prefix = 'prefix1/';

describe('listLocationItemsHandler', () => {
  const mockList = jest.mocked(list);

  beforeEach(() => {
    mockList.mockResolvedValue({ items: [], nextToken: '' });
  });

  afterEach(() => {
    mockList.mockReset();
  });

  it('returns the expected output shape in the happy path', async () => {
    mockList.mockResolvedValueOnce({ items: [], nextToken: 'tokeno' });

    const { items, nextToken } = await listLocationItemsHandler(baseInput);

    expect(items).toHaveLength(0);
    expect(nextToken).toBeDefined();
  });

  it('provides expected `pageSize` to `list` on initial load', async () => {
    mockList.mockResolvedValueOnce({ items: [] });

    const input = {
      ...baseInput,
      options: { pageSize: 10 },
      prefix: 'a_prefix',
    };

    await listLocationItemsHandler(input);

    expect(mockList).toHaveBeenCalledTimes(1);
    expect(mockList).toHaveBeenCalledWith({
      path: input.prefix,
      options: {
        bucket: {
          bucketName: input.config.bucket,
          region: input.config.region,
        },
        customEndpoint: input.config.customEndpoint,
        expectedBucketOwner: input.config.accountId,
        locationCredentialsProvider: input.config.credentials,
        nextToken: undefined,
        pageSize: input.options.pageSize + 1,
        subpathStrategy: { delimiter: undefined, strategy: 'include' },
      },
    });
  });

  it('provides `pageSize` number of items after removing items that match / or . or ..', async () => {
    mockList
      .mockResolvedValueOnce({
        items: [
          { path: `/`, lastModified: new Date(), size: 0 },
          { path: `.`, lastModified: new Date(), size: 0 },
          { path: `..`, lastModified: new Date(), size: 0 },
          { path: `${prefix}-1`, lastModified: new Date(), size: 0 },
        ],
        nextToken: '1',
      })
      .mockResolvedValueOnce({
        items: [
          { path: `${prefix}-2`, lastModified: new Date(), size: 0 },
          { path: `${prefix}-3`, lastModified: new Date(), size: 0 },
        ],
        nextToken: undefined,
      });

    const input = {
      ...baseInput,
      options: { pageSize: 3 },
      prefix: 'a_prefix',
    };

    const listItems = await listLocationItemsHandler(input);
    expect(listItems.items).toHaveLength(input.options.pageSize);
    expect(mockList).toHaveBeenCalledTimes(2);
  });

  it('can exclude by type', async () => {
    mockList.mockResolvedValueOnce({
      items: [
        { path: `someFolder/`, lastModified: new Date(), size: 0 },
        { path: `someFile`, lastModified: new Date(), size: 56984 },
      ],
    });

    const input = { ...baseInput, options: { exclude: 'FOLDER' as const } };

    const listItems = await listLocationItemsHandler(input);
    expect(listItems.items).toHaveLength(1);
  });

  it('uses appropriate subpathStrategy when delimiter is present', async () => {
    const input = { ...baseInput, options: { delimiter: '/' } };

    await listLocationItemsHandler(input);
    expect(mockList).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          subpathStrategy: { delimiter: '/', strategy: 'exclude' },
        }),
      })
    );
  });

  it('can list with an offset', async () => {
    const input = {
      ...baseInput,
      options: { nextToken: 'some-token', pageSize: 3 },
    };

    await listLocationItemsHandler(input);
    expect(mockList).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({ pageSize: 3 }),
      })
    );
  });
});

describe('parseResult', () => {
  it('outputs correct list with items: prefix, zero byte folder, object and excludedSubpaths', () => {
    const output = {
      items: [
        // Current prefix
        { path: prefix, lastModified: new Date(), size: 0 },
        // Zero byte subfolder:
        { path: `${prefix}Banana/`, lastModified: new Date(), size: 0 },
        // Image file:
        { path: `${prefix}Orange.jpg`, lastModified: new Date(), size: 56984 },
      ],
      // subfolder with objects in it
      excludedSubpaths: [`${prefix}Cloudberry/`],
    };
    const result = parseResult(output, prefix);
    expect(result).toHaveLength(3);
    const subFolderWithObject = result[0];
    expect(subFolderWithObject.key).toBe(`${prefix}Cloudberry/`);
    expect(subFolderWithObject.type).toBe('FOLDER');
    const zeroByteSubFolder = result[1];
    expect(zeroByteSubFolder.key).toBe(`${prefix}Banana/`);
    expect(zeroByteSubFolder.type).toBe('FOLDER');
    const file = result[2];
    expect(file.key).toBe(`${prefix}Orange.jpg`);
    expect(file.type).toBe('FILE');
  });

  it('should return empty array for empty zero byte folder', () => {
    // empty folders will just show the current prefix as the path
    const output = {
      items: [{ path: prefix, lastModified: new Date(), size: 0 }],
    };
    const result = parseResult(output, prefix);
    expect(result).toHaveLength(0);
  });

  describe('filterDotItems', () => {
    it('should filter out invalid keys: "/", "." etc', () => {
      const output = {
        items: [
          { path: ` / `, lastModified: new Date(), size: 0 },
          { path: ` ./ `, lastModified: new Date(), size: 0 },
          { path: ` ../ `, lastModified: new Date(), size: 0 },
          { path: ` . `, lastModified: new Date(), size: 0 },
          { path: ` .. `, lastModified: new Date(), size: 0 },
          { path: `${prefix}visible`, lastModified: new Date(), size: 0 },
        ],
      };
      const result = parseResult(output, prefix);
      expect(result).toHaveLength(1);
      expect(result[0].key).toBe(`${prefix}visible`);
    });
  });
});
