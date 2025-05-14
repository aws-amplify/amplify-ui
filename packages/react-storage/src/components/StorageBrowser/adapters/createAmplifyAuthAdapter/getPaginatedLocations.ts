import type { ListLocationsHandlerOutput, LocationData } from '../../actions';

export const getPaginatedLocations = ({
  items,
  pageSize,
  nextToken,
}: {
  items: LocationData[];
  pageSize?: number;
  nextToken?: string;
}): ListLocationsHandlerOutput => {
  if (pageSize) {
    if (nextToken) {
      if (Number(nextToken) > items.length) {
        return { items: [], nextToken: undefined };
      }
      const start = -nextToken;
      const end = start + pageSize < 0 ? start + pageSize : undefined;

      return {
        items: items.slice(start, end),
        nextToken: end ? `${-end}` : undefined,
      };
    }

    return {
      items: items.slice(0, pageSize),
      nextToken:
        items.length > pageSize ? `${items.length - pageSize}` : undefined,
    };
  }

  return { items, nextToken: undefined };
};
