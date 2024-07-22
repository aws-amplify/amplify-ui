import listLocationsAction from '../listLocations';

describe('listLocationsAction', () => {
  it('returns the expected output shape in the happy path', async () => {
    const output = await listLocationsAction(
      {
        nextToken: undefined,
        locations: [],
      },
      { options: { pageSize: 100 } }
    );

    expect(output.locations).toHaveLength(100);
    expect(output.nextToken).toBeDefined();
  });

  it('merges the current action result with the previous action result', async () => {
    const { locations, nextToken } = await listLocationsAction({
      nextToken: undefined,
      locations: [],
    });

    expect(locations).toHaveLength(100);
    expect(nextToken).toBeDefined();

    const { locations: nextLocations, nextToken: nextNextToken } =
      await listLocationsAction({
        locations,
        nextToken,
      });

    expect(nextLocations).toHaveLength(200);
    expect(nextNextToken).not.toBe(nextToken);
    expect(nextToken).toBeDefined();
  });

  it.todo('handles a search action as expected');
  it.todo('handles a refresh action as expected');
  it.todo('handles a paginate action as expected');
});
