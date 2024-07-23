import listLocationItemsAction from '../listLocationItems';

describe('listLocationItemsAction', () => {
  it('returns the expected output shape in the happy path', async () => {
    const { items, nextToken } = await listLocationItemsAction({
      nextToken: undefined,
      items: [],
    });

    expect(items).toHaveLength(100);
    expect(nextToken).toBeDefined();
  });

  it('merges the current action result with the previous action result', async () => {
    const { items, nextToken } = await listLocationItemsAction({
      nextToken: undefined,
      items: [],
    });

    expect(items).toHaveLength(100);
    expect(nextToken).toBeDefined();

    const { items: nextItems, nextToken: nextNextToken } =
      await listLocationItemsAction({
        nextToken,
        items,
      });

    expect(nextItems).toHaveLength(200);
    expect(nextNextToken).not.toBe(nextToken);
    expect(nextToken).toBeDefined();
  });

  it.todo('handles a search action as expected');
  it.todo('handles a refresh action as expected');
  it.todo('handles a paginate action as expected');
});
