import * as StorageModule from '../../../storage-internal';
import {
  listLocationItemsAction,
  parseResult,
} from '../listLocationItemsAction';

let uuid = 0;
Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => {
      uuid++;
      return uuid.toString();
    },
  },
});

const listSpy = jest.spyOn(StorageModule, 'list');
const config = {
  bucket: 'bucket',
  credentialsProvider: jest.fn(),
  region: 'region',
};

const options = { delimiter: '/' };
const prefix = 'a_prefix/';
const initialValue = { nextToken: undefined, result: [] };

const generateMockItems = (size: number): StorageModule.ListOutput['items'] => {
  return Array.apply(0, new Array(size)).map((_, index) => ({
    path: `${prefix}key${index}`,
    lastModified: new Date(),
    size: 1,
  }));
};

const generateMockSubpaths = (
  size: number
): StorageModule.ListOutput['excludedSubpaths'] =>
  Array.apply(0, new Array(size)).map((_, index) => {
    return `subpath${index}`;
  });

describe('listLocationItemsAction', () => {
  beforeEach(() => {
    listSpy.mockClear();
  });

  it('returns the expected output shape in the happy path', async () => {
    listSpy.mockResolvedValueOnce({ items: [], nextToken: 'tokeno' });

    const { result, nextToken } = await listLocationItemsAction(initialValue, {
      config,
      prefix,
    });

    expect(result).toHaveLength(0);
    expect(nextToken).toBeDefined();
  });

  it('merges the current action result with the previous action result', async () => {
    listSpy
      .mockResolvedValueOnce({
        items: generateMockItems(100),
        excludedSubpaths: generateMockSubpaths(10),
        nextToken: 'first',
      })
      .mockResolvedValueOnce({
        items: generateMockItems(100),
        excludedSubpaths: generateMockSubpaths(10),
        nextToken: 'second',
      });

    const { result, nextToken } = await listLocationItemsAction(initialValue, {
      config,
      options,
      prefix: 'a_prefix',
    });

    expect(result).toHaveLength(110);
    expect(nextToken).toBeDefined();

    const { result: nextResult, nextToken: nextNextToken } =
      await listLocationItemsAction(
        { nextToken, result },
        { config, options, prefix: 'a_prefix' }
      );

    expect(nextResult).toHaveLength(220);
    expect(nextNextToken).not.toBe(nextToken);
    expect(nextToken).toBeDefined();
  });

  it('provides expected `pageSize` to `list` on `refresh`', async () => {
    listSpy.mockResolvedValueOnce({ items: [] });

    const input = {
      config,
      options: { refresh: true, pageSize: 10 },
      prefix: 'a_prefix',
    };

    await listLocationItemsAction(initialValue, input);

    expect(listSpy).toHaveBeenCalledTimes(1);
    expect(listSpy).toHaveBeenCalledWith({
      path: input.prefix,
      options: {
        bucket: {
          bucketName: input.config.bucket,
          region: input.config.region,
        },
        locationCredentialsProvider: input.config.credentialsProvider,
        nextToken: undefined,
        pageSize: input.options.pageSize + 1,
        subpathStrategy: { delimiter: undefined, strategy: 'include' },
      },
    });
  });

  it('provides expected `pageSize` to `list` on initial load', async () => {
    listSpy.mockResolvedValueOnce({ items: [] });

    const input = { config, options: { pageSize: 10 }, prefix: 'a_prefix' };

    await listLocationItemsAction(initialValue, input);

    expect(listSpy).toHaveBeenCalledTimes(1);
    expect(listSpy).toHaveBeenCalledWith({
      path: input.prefix,
      options: {
        bucket: {
          bucketName: input.config.bucket,
          region: input.config.region,
        },
        locationCredentialsProvider: input.config.credentialsProvider,
        nextToken: undefined,
        pageSize: input.options.pageSize + 1,
        subpathStrategy: { delimiter: undefined, strategy: 'include' },
      },
    });
  });

  it.todo('handles a search action as expected');
  it.todo('handles a paginate action as expected');
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
    expect(result).toHaveLength(3); // excludes prefix
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
});
