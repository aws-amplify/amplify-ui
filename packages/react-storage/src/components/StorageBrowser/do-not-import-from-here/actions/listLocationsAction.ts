import { LocationData } from '../../actions';
import { ListLocations, ListLocationsOutput } from '../../storage-internal';
import { parseLocationAccess } from '../../actions/handlers/utils';
import { Permission } from '../../storage-internal';

import { ListActionInput, ListActionOptions, ListActionOutput } from '../types';

const PAGE_SIZE = 1000;

export interface ListLocationsActionOptions<T>
  extends Omit<ListActionOptions<T>, 'delimiter'> {}

export interface ListLocationsActionInput<T = Permission>
  extends Omit<
    ListActionInput<ListLocationsActionOptions<T>>,
    'prefix' | 'config'
  > {}

export interface ListLocationsActionOutput
  extends ListActionOutput<LocationData> {}

export type ListLocationsAction = (
  prevState: ListLocationsActionOutput,
  input: ListLocationsActionInput
) => Promise<ListLocationsActionOutput>;

const shouldExclude = <T extends Permission>(
  permission: T,
  exclude?: T | T[]
) =>
  !exclude
    ? false
    : typeof exclude === 'string'
    ? exclude === permission
    : exclude.includes(permission);

export const createListLocationsAction = (
  listLocations: ListLocations
): ListLocationsAction =>
  async function listLocationsAction(prevState, input) {
    const { options } = input ?? {};
    const {
      exclude,
      nextToken,
      pageSize = PAGE_SIZE,
      refresh,
      reset,
    } = options ?? {};

    if (reset) {
      return { result: [], nextToken: undefined };
    }

    let locationsResult: ListLocationsOutput['locations'] = [];
    let nextNextToken: ListLocationsOutput['nextToken'] = refresh
      ? undefined
      : nextToken;

    do {
      const remainingPageSize = pageSize - locationsResult.length;

      const output = await listLocations({
        nextToken: nextNextToken,
        pageSize: remainingPageSize,
      });

      nextNextToken = output.nextToken;
      locationsResult = [
        ...locationsResult,
        ...output.locations.filter(
          ({ permission, type, scope }) =>
            !(
              shouldExclude(permission, exclude) ||
              // filter out PREFIX/BUCKET types with scopes that don't end with /*, e.g. /prefix*
              (type !== 'OBJECT' && !scope.endsWith('/*')) ||
              // filter out OBJECT types  with WRITE Permission
              (type === 'OBJECT' && permission === 'WRITE')
            )
        ),
      ];
    } while (nextNextToken && locationsResult.length < pageSize);

    const nextLocations = locationsResult.map(parseLocationAccess);

    const result = refresh
      ? nextLocations
      : [...(prevState.result ?? []), ...nextLocations];

    return { result, nextToken: nextNextToken };
  };
