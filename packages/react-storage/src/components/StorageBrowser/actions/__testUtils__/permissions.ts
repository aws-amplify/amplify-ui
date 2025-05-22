import type { LocationPermissions } from '../handlers';

export const generateCombinations = <T>(values: T[]): T[][] => {
  if (values.length === 1) {
    return [values];
  }

  const [first, ...rest] = values;
  const restPermutations = generateCombinations(rest);

  const firstPermutations = restPermutations.map((value) => [first, ...value]);
  return [...restPermutations, ...firstPermutations, [first]];
};

export const LOCATION_PERMISSION_VALUES: LocationPermissions = [
  'get',
  'list',
  'delete',
  'write',
];
