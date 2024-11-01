import { ListLocations, Permission } from '../../storage-internal';

export type LocationAccess = Awaited<
  ReturnType<ListLocations>
>['locations'][number];

export type LocationType = 'OBJECT' | 'PREFIX' | 'BUCKET';

/**
 * `location` metadata
 */
export interface LocationData {
  /**
   * `location` s3 bucket
   */
  bucket: string;

  /**
   * Unique identifier
   */
  id: string;

  /**
   * `location` permission granted to user
   */
  permission: Permission;

  /**
   * `location` base prefix, delimited by `'/'`. Empty string indicates bucket root
   */
  prefix: string;

  /**
   * `location` grant scope
   *
   * @type "OBJECT" | "PREFIX" | "BUCKET"
   */
  type: LocationType;
}
