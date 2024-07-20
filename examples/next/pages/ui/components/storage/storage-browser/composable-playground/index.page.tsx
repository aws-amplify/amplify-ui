import { createStorageBrowser } from '@aws-amplify/ui-react-storage';
import {
  Button,
  TextField,
  Flex,
  Heading as _Heading,
} from '@aws-amplify/ui-react';
import { IconSearch as _IconSearch } from '@aws-amplify/ui-react/internal';
import '@aws-amplify/ui-react/styles.css';
import React from 'react';
import {
  Column,
  Data,
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
const elements = {
  Input: TextField,
  View: Flex,
  Icon,
  Button,
  Span: Flex,
  Title: Title,
};

const { StorageBrowser } = createStorageBrowser();

const items = [
  { label: 'Home' },
  { label: 'SomeLocation' },
  { label: 'Some folder' },
];

interface Location extends Data {
  permission?: string;
  created?: string;
}

const rows = [
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

export default function Example() {
  return (
    <StorageBrowser.Provider>
      <StorageBrowser.Controls.History items={items} />
      <StorageBrowser.Controls.Title />
      <StorageBrowser.Controls.Divider />
      <StorageBrowser.Controls.Search />
      <StorageBrowser.Controls.Refresh />
      <StorageBrowser.Controls.Paginate />
      <StorageBrowser.Controls.Table data={{ columns, rows }} />
    </StorageBrowser.Provider>
  );
}
