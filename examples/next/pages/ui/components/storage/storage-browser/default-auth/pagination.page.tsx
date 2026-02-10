import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';

import {
  Flex,
  View,
  SelectField,
  Text,
  Tabs,
  Heading,
  Divider,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { StorageBrowser } from '@aws-amplify/ui-react-storage';
import {
  createStorageBrowser,
  createAmplifyAuthAdapter,
} from '@aws-amplify/ui-react-storage/browser';
import config from './aws-exports';

Amplify.configure(config);

const { StorageBrowser: ComposableStorageBrowser } = createStorageBrowser({
  config: createAmplifyAuthAdapter(),
});

const PAGE_SIZE_OPTIONS = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
  { value: 200, label: '200' },
];

function PaginationTest() {
  const [globalPageSize, setGlobalPageSize] = useState<number>(100);
  const [locationsPageSize, setLocationsPageSize] = useState<number>(25);
  const [detailPageSize, setDetailPageSize] = useState<number>(10);
  const [uploadPageSize, setUploadPageSize] = useState<number>(10);
  const [copyPageSize, setCopyPageSize] = useState<number>(10);
  const [deletePageSize, setDeletePageSize] = useState<number>(10);
  const [downloadPageSize, setDownloadPageSize] = useState<number>(10);

  const PageSizeControl = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
  }) => (
    <Flex direction="column" gap="xs">
      <Text fontSize="small" fontWeight="semibold">
        {label}
      </Text>
      <SelectField
        label=""
        labelHidden
        value={value.toString()}
        onChange={(e) => onChange(parseInt(e.target.value))}
        size="small"
      >
        {PAGE_SIZE_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </SelectField>
    </Flex>
  );

  return (
    <Flex direction="column" height="100vh" padding="large">
      <Flex direction="column" gap="medium" marginBlockEnd="large">
        <Heading level={3}>StorageBrowser Pagination Test</Heading>
        <Text color="font.tertiary">
          Test global and per-view pageSize configuration. Switch between
          Standard mode (global pageSize) and Composition mode (per-view
          overrides).
        </Text>
      </Flex>

      <Tabs.Container defaultValue="standard">
        <Tabs.List>
          <Tabs.Item value="standard">Standard Mode</Tabs.Item>
          <Tabs.Item value="composition">Composition Mode</Tabs.Item>
        </Tabs.List>

        <Tabs.Panel value="standard">
          <Flex direction="column" gap="medium" paddingBlock="medium">
            <Flex alignItems="flex-end" gap="medium">
              <PageSizeControl
                label="Global Page Size"
                value={globalPageSize}
                onChange={setGlobalPageSize}
              />
              <Text fontSize="small" color="font.tertiary">
                Applied to all views
              </Text>
            </Flex>

            <Divider />

            <View overflow="auto">
              <StorageBrowser key={globalPageSize} pageSize={globalPageSize} />
            </View>
          </Flex>
        </Tabs.Panel>

        <Tabs.Panel value="composition">
          <Flex direction="column" gap="medium" paddingBlock="medium">
            <Flex wrap="wrap" gap="medium">
              <PageSizeControl
                label="Global"
                value={globalPageSize}
                onChange={setGlobalPageSize}
              />
              <PageSizeControl
                label="Locations"
                value={locationsPageSize}
                onChange={setLocationsPageSize}
              />
              <PageSizeControl
                label="Detail"
                value={detailPageSize}
                onChange={setDetailPageSize}
              />
              <PageSizeControl
                label="Upload"
                value={uploadPageSize}
                onChange={setUploadPageSize}
              />
              <PageSizeControl
                label="Copy"
                value={copyPageSize}
                onChange={setCopyPageSize}
              />
              <PageSizeControl
                label="Delete"
                value={deletePageSize}
                onChange={setDeletePageSize}
              />
              <PageSizeControl
                label="Download"
                value={downloadPageSize}
                onChange={setDownloadPageSize}
              />
            </Flex>

            <Divider />

            <View overflow="auto">
              <ComposableStorageBrowser.Provider pageSize={globalPageSize}>
                <ComposableStorageBrowser.LocationsView
                  pageSize={locationsPageSize}
                />
                <ComposableStorageBrowser.LocationDetailView
                  pageSize={detailPageSize}
                />
                <ComposableStorageBrowser.UploadView
                  pageSize={uploadPageSize}
                />
                <ComposableStorageBrowser.CopyView pageSize={copyPageSize} />
                <ComposableStorageBrowser.DeleteView
                  pageSize={deletePageSize}
                />
                <ComposableStorageBrowser.DownloadView
                  pageSize={downloadPageSize}
                />
              </ComposableStorageBrowser.Provider>
            </View>
          </Flex>
        </Tabs.Panel>
      </Tabs.Container>
    </Flex>
  );
}

export default withAuthenticator(PaginationTest);
