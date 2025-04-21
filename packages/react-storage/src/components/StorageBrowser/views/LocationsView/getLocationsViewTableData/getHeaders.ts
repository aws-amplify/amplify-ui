import type { LocationViewHeaders } from './types';

export const getHeaders = ({
  hasObjectLocations,
  tableColumnActionsHeader,
  tableColumnBucketHeader,
  tableColumnFolderHeader,
  tableColumnPermissionsHeader,
}: {
  hasObjectLocations: boolean;
  tableColumnActionsHeader: string;
  tableColumnBucketHeader: string;
  tableColumnFolderHeader: string;
  tableColumnPermissionsHeader: string;
}): LocationViewHeaders => {
  const headers: LocationViewHeaders = [
    {
      key: 'folder',
      type: 'sort',
      content: { label: tableColumnFolderHeader },
    },
    {
      key: 'bucket',
      type: 'sort',
      content: { label: tableColumnBucketHeader },
    },
    {
      key: 'permission',
      type: 'sort',
      content: { label: tableColumnPermissionsHeader },
    },
  ];

  if (hasObjectLocations) {
    headers.push({
      key: 'action',
      type: 'sort',
      content: { label: tableColumnActionsHeader },
    });
  }

  return headers;
};
