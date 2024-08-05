import { ListLocations } from '@aws-amplify/storage/storage-browser';
import { createListLocationsAction } from '../listLocationsAction';
import { LocationAccess } from '../types';

const fakeLocation = {
  scope: 's3://some-bucket/*',
  permission: 'READ',
  type: 'BUCKET',
};

const generateMockLocations = (size: number) =>
  Array(size).fill(fakeLocation) as LocationAccess[];

const listLocations: ListLocations = ({ pageSize } = {}) => {
  return Promise.resolve({
    locations: generateMockLocations(pageSize!),
    nextToken: undefined,
  });
};

const mockListLocations = jest.fn(listLocations);

describe('createListLocationsAction', () => {
  beforeEach(() => {
    mockListLocations.mockClear();
  });
  it('returns the expected output shape in the happy path', async () => {
    mockListLocations.mockResolvedValueOnce({
      locations: generateMockLocations(100),
      nextToken: 'next',
    });
    const listLocationsAction = createListLocationsAction(mockListLocations);

    const output = await listLocationsAction(
      { nextToken: undefined, result: [] },
      { options: { pageSize: 100 } }
    );

    expect(output.result).toHaveLength(100);
    expect(output.nextToken).toBeDefined();
  });

  it('merges the current action result with the previous action result', async () => {
    mockListLocations
      .mockResolvedValueOnce({
        locations: generateMockLocations(100),
        nextToken: 'next',
      })
      .mockResolvedValueOnce({
        locations: generateMockLocations(100),
        nextToken: 'next-oooo',
      });

    const listLocationsAction = createListLocationsAction(mockListLocations);
    const { result, nextToken } = await listLocationsAction(
      { nextToken: undefined, result: [] },
      { options: { pageSize: 100 } }
    );

    expect(result).toHaveLength(100);
    expect(nextToken).toBeDefined();

    const { result: nextResult, nextToken: nextNextToken } =
      await listLocationsAction(
        { result, nextToken },
        { options: { pageSize: 100 } }
      );

    expect(nextResult).toHaveLength(200);
    expect(nextNextToken).not.toBe(nextToken);
    expect(nextToken).toBeDefined();
  });

  it.todo('handles a search action as expected');
  it.todo('handles a refresh action as expected');
  it.todo('handles a paginate action as expected');
});
