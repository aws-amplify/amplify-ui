import { ListLocations, Permission } from '../../storage-internal';

export type LocationAccess = Awaited<
  ReturnType<ListLocations>
>['locations'][number];

export type LocationType = 'OBJECT' | 'PREFIX' | 'BUCKET';

export interface LocationData {
  bucket: string;
  id: string;
  permission: Permission;
  prefix: string;
  type: LocationType;
}
