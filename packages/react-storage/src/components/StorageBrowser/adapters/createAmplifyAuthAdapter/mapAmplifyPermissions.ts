import { Permission, StorageAccess } from '../../storage-internal';

export const mapAmplifyPermissions = (
  permission: StorageAccess[]
): Permission => {
  let result: string = '';

  permission.forEach((access: StorageAccess) => {
    if (['read', 'get', 'list'].includes(access as string)) {
      if (!result.includes('READ')) {
        result += 'READ';
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
