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

const { StorageBrowser } = createStorageBrowser({ elements });

const items = [
  { label: 'Home' },
  { label: 'SomeLocation' },
  { label: 'Some folder' },
];

export default function Example() {
  return (
    <StorageBrowser.Provider>
      <StorageBrowser.Controls.History items={items} />
      <StorageBrowser.Controls.Title />
      <StorageBrowser.Controls.Divider />
      <StorageBrowser.Controls.Search />
      <StorageBrowser.Controls.Refresh />
    </StorageBrowser.Provider>
  );
}
