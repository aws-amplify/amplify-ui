import { createStorageBrowser } from '@aws-amplify/ui-react-storage';
import {
  Button,
  TextField,
  Flex,
  Heading as _Heading,
} from '@aws-amplify/ui-react';
import { IconSearch as _IconSearch } from '@aws-amplify/ui-react/internal';
import '@aws-amplify/ui-react/styles.css';
import React, { useCallback, useState } from 'react';
import {
  Column,
  ILocation,
  SortDirection,
} from '@aws-amplify/ui-react-storage/dist/types/components/StorageBrowser/Views/Controls/Table';

const Icon = React.forwardRef<SVGSVGElement>(function IconSearch(props, ref) {
  return <_IconSearch {...props} ref={ref as any} />;
});

const Title = React.forwardRef<HTMLHeadingElement>(
  function Heading(props, ref) {
    return <_Heading level={2} {...props} ref={ref as any} />;
  }
);

// test Amplify UI elements
// const elements = {
//   Input: TextField,
//   View: Flex,
//   Icon,
//   Button,
//   Span: Flex,
//   Title: Title,
// };

const { StorageBrowser } = createStorageBrowser();

const items = [
  { label: 'Home' },
  { label: 'SomeLocation' },
  { label: 'Some folder' },
];

interface Location extends ILocation {
  permission?: string;
  created?: string;
}

function CompareFn(a: string, b: string): number;
function CompareFn(a: number, b: number): number;
function CompareFn(a: string | number, b: string | number): number {
  const isDateString = (s: string) => !isNaN(Date.parse(s));

  if (typeof a === 'string' && typeof b === 'string') {
    if (isDateString(a) && isDateString(b)) {
      // Compare strings as dates
      return new Date(a).getTime() - new Date(b).getTime();
    }

    // Otherwise, compare them as regular strings
    return a.localeCompare(b);
  } else if (typeof a === 'number' && typeof b === 'number') {
    // Compare numbers
    return a - b;
  }
  throw new Error('Invalid arguments');
}

export default function Example() {
  const rows: Location[] = [
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

  const columns: Column<Location>[] = [
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

  const [originalRowData, setOriginalRowData] = useState<Location[]>(rows);
  const [rowData, setRowData] = useState<Location[]>(rows);
  const [sortState, setSortState] = useState<{
    key: keyof Location;
    direction: SortDirection;
  }>({ key: 'name', direction: 'none' });

  const handleSort = useCallback(
    (column: Column<Location>) => {
      setSortState((prevConfig) => {
        let direction: SortDirection = 'none';

        if (prevConfig.key === column.key) {
          // Cycle the sort for the same column: asc -> desc -> none -> loop back to start
          if (prevConfig.direction === 'ascending') {
            direction = 'descending';
          } else if (prevConfig.direction === 'descending') {
            direction = 'none';
          } else {
            direction = 'ascending';
          }
        } else {
          // Sorting with a different column
          direction = 'ascending';
        }

        let sorted = [...originalRowData];

        if (direction !== 'none') {
          sorted.sort((a, b) => {
            if (direction === 'ascending') {
              return CompareFn(a[column.key], b[column.key]);
            }

            if (direction === 'descending') {
              return CompareFn(b[column.key], a[column.key]);
            }

            return 0;
          });
        } else {
          sorted = originalRowData;
        }

        setRowData(sorted);

        return { key: column.key, direction };
      });
    },
    [rowData]
  );

  return (
    <StorageBrowser.Provider>
      <StorageBrowser.Controls.History items={items} />
      <StorageBrowser.Controls.Title />
      <StorageBrowser.Controls.Divider />
      <StorageBrowser.Controls.Search />
      <StorageBrowser.Controls.Refresh />
      <StorageBrowser.Controls.Paginate />
      <StorageBrowser.Controls.Table
        data={{ columns, rows: rowData }}
        onSort={handleSort}
        sortState={sortState}
      />
    </StorageBrowser.Provider>
  );
}
