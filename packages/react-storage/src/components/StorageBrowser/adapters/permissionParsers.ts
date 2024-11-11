import { LocationPermissions } from '../credentials/types';
import { Permission, StorageAccess } from '../storage-internal';

export const parseAccessGrantPermission = (
  accessGrantPermission: Permission
): LocationPermissions => {
  if (accessGrantPermission === 'READ') {
    return ['list', 'get'];
  } else if (accessGrantPermission === 'WRITE') {
    return ['write', 'delete'];
  } else if (accessGrantPermission === 'READWRITE') {
    return ['list', 'get', 'write', 'delete'];
  }
  throw new Error('Improper Permission: Please provide correct permission.');
};

export const toAccessGrantPermission = (
  permission: StorageAccess[]
): Permission => {
  let result: string = '';

  permission.forEach((access: StorageAccess) => {
    if (['read', 'get', 'list'].includes(access as string)) {
      if (!result.includes('READ')) {
        result = 'READ' + result;
      }
    }
    if (['write', 'delete'].includes(access as string)) {
      if (!result.includes('WRITE')) {
        result += 'WRITE';
      }
    }
  });

  if (result === '') {
    throw new Error('Improper Permission: Please provide correct permission.');
  }

  return result as Permission;
};

export const parseAmplifyAuthPermission = (
  permissions: StorageAccess[]
): LocationPermissions => {
  const result: LocationPermissions = [];

  permissions.sort().forEach((access: StorageAccess) => {
    if (access === 'read') {
      if (!result.includes('list')) {
        result.push('list');
      }
      if (!result.includes('get')) {
        result.push('get');
      }
    } else if (!result.includes(access)) {
      result.push(access);
    }
  });

  if (result.length === 0) {
    throw new Error('Improper Permission: Please provide correct permission.');
  }

  return result;
};
