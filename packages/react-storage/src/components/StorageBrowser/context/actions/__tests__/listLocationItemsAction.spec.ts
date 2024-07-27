import * as StorageModule from 'aws-amplify/storage';
import listLocationItemsAction from '../listLocationItemsAction';

const listSpy = jest.spyOn(StorageModule, 'list');

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

    const { items, nextToken } = await listLocationItemsAction(
      {
        nextToken: undefined,
        items: [],
      },
      { prefix: 'a_prefix' }
    );

    expect(items).toHaveLength(0);
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

    const { items, nextToken } = await listLocationItemsAction(
      { nextToken: undefined, items: [] },
      { prefix: 'a_prefix' }
    );

    expect(items).toHaveLength(100);
    expect(nextToken).toBeDefined();

    const { items: nextItems, nextToken: nextNextToken } =
      await listLocationItemsAction(
        { nextToken, items },
        { prefix: 'a_prefix' }
      );

    expect(nextItems).toHaveLength(200);
    expect(nextNextToken).not.toBe(nextToken);
    expect(nextToken).toBeDefined();
  });

  it.todo('handles a search action as expected');
  it.todo('handles a refresh action as expected');
  it.todo('handles a paginate action as expected');
});
