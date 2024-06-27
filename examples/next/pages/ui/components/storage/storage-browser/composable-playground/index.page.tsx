import { createStorageBrowser } from '@aws-amplify/ui-react-storage';
import { Button, TextField, Flex } from '@aws-amplify/ui-react';
import { IconSearch as _IconSearch } from '@aws-amplify/ui-react/internal';
import '@aws-amplify/ui-react/styles.css';
import React from 'react';

const Icon = React.forwardRef<SVGSVGElement>(function IconSearch(props, ref) {
  return <_IconSearch {...props} ref={ref as any} />;
});

// test Amplify UI elements
const elements = { Input: TextField, View: Flex, Icon, Button, Span: Flex };

const { StorageBrowser } = createStorageBrowser({ elements });

export default function Example() {
  return (
    <StorageBrowser.Provider>
      <StorageBrowser.Controls.Search />
    </StorageBrowser.Provider>
  );
}
