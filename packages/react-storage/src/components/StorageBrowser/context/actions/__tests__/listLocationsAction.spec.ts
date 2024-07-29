import {
  createListLocationsAction,
  ListLocationsActionInput,
  ListLocationsActionOutput,
} from '../listLocationsAction';

const generateMockLocations = (size: number) => [...Array(size).keys()];

const mockListLocations = jest.fn(
  ({
    pageSize,
  }: ListLocationsActionInput): Promise<ListLocationsActionOutput> => {
    // @ts-expect-error temporary badly constructed mock function
    return Promise.resolve({
      locations: generateMockLocations(pageSize!),
      nextToken: undefined,
    });
  }
);

describe('createListLocationsAction', () => {
  beforeEach(() => {
    mockListLocations.mockClear();
  });
  it('returns the expected output shape in the happy path', async () => {
    mockListLocations.mockResolvedValueOnce({
      // @ts-expect-error temporary workaround
      locations: generateMockLocations(100),
      nextToken: 'next',
    });
    const listLocationsAction = createListLocationsAction(mockListLocations);

    const output = await listLocationsAction(
      { nextToken: undefined, locations: [] },
      { pageSize: 100 }
    );

    expect(output.locations).toHaveLength(100);
    expect(output.nextToken).toBeDefined();
  });

  it('merges the current action result with the previous action result', async () => {
    mockListLocations
      .mockResolvedValueOnce({
        // @ts-expect-error temporary workaround
        locations: generateMockLocations(100),
        nextToken: 'next',
      })
      .mockResolvedValueOnce({
        // @ts-expect-error temporary workaround
        locations: generateMockLocations(100),
        nextToken: 'next-oooo',
      });

    const listLocationsAction = createListLocationsAction(mockListLocations);
    const { locations, nextToken } = await listLocationsAction(
      {
        nextToken: undefined,
        locations: [],
      },
      { pageSize: 100 }
    );

    expect(locations).toHaveLength(100);
    expect(nextToken).toBeDefined();

    const { locations: nextLocations, nextToken: nextNextToken } =
      await listLocationsAction(
        {
          locations,
          nextToken,
        },
        { pageSize: 100 }
      );

    expect(nextLocations).toHaveLength(200);
    expect(nextNextToken).not.toBe(nextToken);
    expect(nextToken).toBeDefined();
  });

  it.todo('handles a search action as expected');
  it.todo('handles a refresh action as expected');
  it.todo('handles a paginate action as expected');
});
