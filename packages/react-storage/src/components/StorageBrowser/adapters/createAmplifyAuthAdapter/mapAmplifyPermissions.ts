import { Permission, StorageAccess } from '../../storage-internal';

export const mapAmplifyPermissions = (
  permission: StorageAccess[]
): Permission => {
  let result: string = '';

  permission.forEach((perm: StorageAccess) => {
    if (['read', 'get', 'list'].includes(perm as string)) {
      if (!result.includes('READ')) {
        result += 'READ';
      }
    }
    if (['write', 'delete'].includes(perm as string)) {
      if (!result.includes('WRITE')) {
        result += 'WRITE';
      }
    }
  });

  return result as Permission;
};
