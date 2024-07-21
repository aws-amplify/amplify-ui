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

const Title = React.forwardRef<HTMLHeadingElement>(
  function Heading(props, ref) {
    return <_Heading level={4} {...props} ref={ref as any} />;
  }
);

// test Amplify UI elements
const elements = {
  Input: TextField,
  View: Flex,
  Button,
  Span: Flex,
  Title: Title,
};

const { StorageBrowser } = createStorageBrowser({ elements });

export default function Example() {
  return (
    <StorageBrowser.Provider>
      <Flex>
        <Flex direction={'column'}>
          <StorageBrowser.LocationsListView />
        </Flex>
        <Flex direction={'column'}>
          <StorageBrowser.LocationDetailView />
        </Flex>
      </Flex>
    </StorageBrowser.Provider>
  );
}
