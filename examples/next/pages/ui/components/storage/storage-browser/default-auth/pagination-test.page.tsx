import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';

import { Flex, View, SelectField, Text, Alert } from '@aws-amplify/ui-react';
import { StorageBrowser } from '@aws-amplify/ui-react-storage';
import config from './aws-exports';

import '@aws-amplify/ui-react-storage/styles.css';

Amplify.configure(config);

function PaginationTest() {
  const [pageSize, setPageSize] = useState<number>(10);
  const [showAlert, setShowAlert] = useState(true);

  const pageSizeOptions = [
    { value: 5, label: '5 items per page' },
    { value: 10, label: '10 items per page' },
    { value: 25, label: '25 items per page' },
    { value: 50, label: '50 items per page' },
    { value: 100, label: '100 items per page' },
    { value: 500, label: '500 items per page' },
    { value: 1000, label: '1000 items per page' },
  ];

  return (
    <Flex
      direction="column"
      width="100vw"
      height="100vh"
      overflow="hidden"
      padding="xl"
    >
      {showAlert && (
        <Alert
          variation="info"
          isDismissible
          onDismiss={() => setShowAlert(false)}
          marginBlockEnd="medium"
        >
          <Text>
            <strong>🧪 StorageBrowser Pagination Test</strong>
            <br />
            Testing the new pageSize prop with per-view configuration support.
            Change the page size below and observe the pagination behavior.
            Check browser console for validation warnings when invalid values
            are used. No upper limit on pageSize - test with large values!
          </Text>
        </Alert>
      )}

      <Flex
        justifyContent="space-between"
        alignItems="center"
        marginBlockEnd="xl"
        wrap="wrap"
        gap="medium"
      >
        <Text fontSize="xl" fontWeight="bold">
          StorageBrowser Pagination Test
        </Text>

        <Flex alignItems="center" gap="medium">
          <Text fontWeight="bold">Page Size:</Text>
          <SelectField
            label=""
            value={pageSize.toString()}
            onChange={(e) => {
              const newPageSize = parseInt(e.target.value);
              setPageSize(newPageSize);
              console.log(`📄 Page size changed to: ${newPageSize}`);
            }}
            width="200px"
          >
            {pageSizeOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
            {/* Test invalid values */}
            <option value="0">0 (invalid - will use default)</option>
            <option value="-5">-5 (invalid - will use default)</option>
          </SelectField>
        </Flex>
      </Flex>

      <View flex="1" overflow="hidden">
        <StorageBrowser
          key={pageSize}
          pageSize={pageSize}
          displayText={{
            LocationsView: {
              title: `Pagination Test - ${pageSize} items per page`,
            },
          }}
        />
      </View>
    </Flex>
  );
}

export default PaginationTest;
