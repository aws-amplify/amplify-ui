import {
  ListPathsOutput,
  listPaths,
  StorageAccess,
} from '@aws-amplify/storage/internals';

// omit both 'permission' and 'permissions' from base interface
type PathAccessBase = Omit<
  ListPathsOutput['locations'][number],
  'permission' | 'permissions'
>;

// includes legacy "permission" key
interface PathAccessWithPermission extends PathAccessBase {
  permission: StorageAccess[];
}

interface PathAccessWithPermissions extends PathAccessBase {
  permissions: StorageAccess[];
}

interface ExtendedListPathsOutput {
  locations: (PathAccessWithPermission | PathAccessWithPermissions)[];
}

type ExtendedListPaths = () => Promise<ExtendedListPathsOutput>;

const extendedListPaths: ExtendedListPaths = listPaths;

const isPathAccessWithPermissions = (
  value: unknown
): value is PathAccessWithPermissions =>
  !!(value as PathAccessWithPermissions)?.['permissions'];

export const createLink = async (subPath: string, path?: string) => {
  const [_location] = (await extendedListPaths()).locations ?? [];
  const permissions = isPathAccessWithPermissions(_location)
    ? _location.permissions
    : _location.permission;
  const { prefix, ...rest } = _location;

  const location = {
    ...rest,
    id: '',
    prefix: prefix.endsWith('*') ? prefix.slice(0, -1) : prefix,
    permissions,
  };

  return `${subPath}/l/${encodeURIComponent(JSON.stringify(location))}/p/${
    typeof path === 'string' ? encodeURIComponent(path) : ''
  }`;
};
