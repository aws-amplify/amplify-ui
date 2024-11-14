import {
  parseAccessGrantPermission,
  toAccessGrantPermission,
  parseAmplifyAuthPermission,
} from '../../adapters/permissionParsers';
import { StorageAccess } from '../../storage-internal';

import { generateCombinations } from '../../actions/__tests__/__testUtils__/permissions';

describe('parseAccessGrantPermission', () => {
  it.each([
    ['READ' as const, ['get', 'list']],
    ['WRITE' as const, ['delete', 'write']],
    ['READWRITE' as const, ['delete', 'get', 'list', 'write']],
  ])('should parse %s to %s', (permission, expected) => {
    expect(parseAccessGrantPermission(permission)).toEqual(expected);
  });

  it('should throw an error if the permission is invalid', () => {
    // @ts-expect-error: test invalid permission
    expect(() => parseAccessGrantPermission('INVALID')).toThrow(
      'Improper Permission: Please provide correct permission.'
    );
  });
});

describe('toAccessGrantPermission', () => {
  const readAccessCombinations = generateCombinations([
    'read',
    'list',
    'get',
  ] as StorageAccess[]);
  const writeAccessCombinations = generateCombinations([
    'write',
    'delete',
  ] as StorageAccess[]);
  const readWriteCombinations = [] as StorageAccess[][];
  for (const readAccess of readAccessCombinations) {
    for (const writeAccess of writeAccessCombinations) {
      readWriteCombinations.push([...readAccess, ...writeAccess]);
    }
  }
  it.each([
    ...readAccessCombinations.map(
      (permissions) => [permissions, 'READ'] as const
    ),
    ...writeAccessCombinations.map(
      (permissions) => [permissions, 'WRITE'] as const
    ),
    ...readWriteCombinations.map(
      (permissions) => [permissions, 'READWRITE'] as const
    ),
  ])('should parse %s to %s', (permissions, expected) => {
    expect(toAccessGrantPermission(permissions)).toEqual(expected);
  });

  it('should throw an error if the permission is invalid', () => {
    // @ts-expect-error: test invalid permission
    expect(() => toAccessGrantPermission(['INVALID'])).toThrow(
      'Improper Permission: Please provide correct permission.'
    );
  });
});

describe('parseAmplifyAuthPermission', () => {
  it.each([
    [['read'], ['get', 'list']],
    [
      ['list', 'get'],
      ['get', 'list'],
    ],
    [
      ['list', 'get', 'delete'],
      ['delete', 'get', 'list'],
    ],
    [
      ['delete', 'write'],
      ['delete', 'write'],
    ],
  ])('should parse %s to %s', (permission, expected) => {
    expect(parseAmplifyAuthPermission(permission as StorageAccess[])).toEqual(
      expected
    );
  });

  it('should throw an error if the permission is invalid', () => {
    // @ts-expect-error: test invalid permission
    expect(() => parseAmplifyAuthPermission(['INVALID'])).toThrow(
      'Improper Permission: Please provide correct permission.'
    );
  });
});
