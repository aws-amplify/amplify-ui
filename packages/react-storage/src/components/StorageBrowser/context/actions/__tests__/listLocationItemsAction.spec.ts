import * as StorageModule from 'aws-amplify/storage';
import { listLocationItemsAction } from '../listLocationItemsAction';

const listSpy = jest.spyOn(StorageModule, 'list');
const config = {
  bucket: 'bucket',
  credentialsProvider: jest.fn(),
  region: 'region',
};
const initialValue = { nextToken: undefined, result: [] };

// actually mocking JS `list` returns is overly complex
const generateMockItems = (size: number) =>
  [
    ...Array(size).keys(),
  ] as unknown as StorageModule.ListPaginateWithPathOutput['items'];

describe('listLocationItemsAction', () => {
  beforeEach(() => {
    listSpy.mockClear();
  });

  it('returns the expected output shape in the happy path', async () => {
    // @ts-expect-error
    listSpy.mockResolvedValueOnce({ items: [], nextToken: 'tokeno' });

    const { result, nextToken } = await listLocationItemsAction(initialValue, {
      config,
      prefix: 'a_prefix',
    });

    expect(result).toHaveLength(0);
    expect(nextToken).toBeDefined();
  });

  it('merges the current action result with the previous action result', async () => {
    listSpy
      .mockResolvedValueOnce({
        // @ts-expect-error - JS union interfaces casue type issues
        items: generateMockItems(100),
        nextToken: 'first',
      })
      .mockResolvedValueOnce({
        // @ts-expect-error - JS union interfaces casue type issues
        items: generateMockItems(100),
        nextToken: 'second',
      });

    const { result, nextToken } = await listLocationItemsAction(initialValue, {
      config,
      prefix: 'a_prefix',
    });

    expect(result).toHaveLength(100);
    expect(nextToken).toBeDefined();

    const { result: nextResult, nextToken: nextNextToken } =
      await listLocationItemsAction(
        { nextToken, result },
        { config, prefix: 'a_prefix' }
      );

    expect(nextResult).toHaveLength(200);
    expect(nextNextToken).not.toBe(nextToken);
    expect(nextToken).toBeDefined();
  });

  it.todo('handles a search action as expected');
  it.todo('handles a refresh action as expected');
  it.todo('handles a paginate action as expected');
});
