import { LocationPermissions } from '../actions';
import { Permission, StorageAccess } from '../storage-internal';

export const parseAccessGrantPermission = (
  accessGrantPermission: Permission
): LocationPermissions => {
  if (accessGrantPermission === 'READ') {
    return ['get', 'list'];
  } else if (accessGrantPermission === 'WRITE') {
    return ['delete', 'write'];
  } else if (accessGrantPermission === 'READWRITE') {
    return ['delete', 'get', 'list', 'write'];
  }
  throw new Error('Improper Permission: Please provide correct permission.');
};

export const toAccessGrantPermission = (
  permission: StorageAccess[]
): Permission => {
  let result: string = '';

  permission.forEach((access: string) => {
    if (['read', 'get', 'list'].includes(access)) {
      if (!result.includes('READ')) {
        result = 'READ' + result;
      }
    }
    if (['write', 'delete'].includes(access)) {
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

export const parseAmplifyAuthPermissions = (
  permissions: StorageAccess[]
): LocationPermissions => {
  const result: LocationPermissions = [];

  permissions.forEach((access: StorageAccess) => {
    if (access === 'read') {
      if (!result.includes('list')) {
        result.push('list');
      }
      if (!result.includes('get')) {
        result.push('get');
      }
    } else if (
      ['delete', 'get', 'list', 'write'].includes(access) &&
      !result.includes(access)
    ) {
      result.push(access);
    }
  });

  if (result.length === 0) {
    throw new Error('Improper Permission: Please provide correct permission.');
  }

  return result.sort();
};
