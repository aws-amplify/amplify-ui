import {
  Column,
  ILocation,
} from '@aws-amplify/ui-react-storage/dist/types/components/StorageBrowser/Views/Controls/Table';

export interface Location extends ILocation {
  permission?: string;
  created?: string;
}

export const rows: Location[] = [
  {
    name: 'alocation1',
    permission: 'read/write',
    created: 'May 4, 2023',
  },
  {
    name: 'loc2',
    permission: 'read',
    created: 'Jan 23, 1990',
  },
  {
    name: 'putnametest',
    permission: 'read',
    created: 'July 18, 2024',
  },
  {
    name: 'authfoldertest',
    permission: 'read/write',
    created: 'September 20, 2022',
  },
];

export const columns: Column<Location>[] = [
  {
    header: 'Name',
    key: 'name',
    sortable: true,
    sortType: 'string',
  },
  {
    header: 'Permission',
    key: 'permission',
    sortable: false,
  },
  {
    header: 'Created',
    key: 'created',
    sortable: true,
    sortType: 'date',
  },
];
