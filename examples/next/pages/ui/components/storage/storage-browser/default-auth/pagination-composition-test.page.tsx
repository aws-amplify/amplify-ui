import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';

import {
  Flex,
  View,
  SelectField,
  Text,
  Alert,
  Tabs,
} from '@aws-amplify/ui-react';
import { StorageBrowser } from '@aws-amplify/ui-react-storage';
import {
  createStorageBrowser,
  createAmplifyAuthAdapter,
} from '@aws-amplify/ui-react-storage/browser';
import config from './aws-exports';

import '@aws-amplify/ui-react-storage/styles.css';

Amplify.configure(config);

// Create StorageBrowser with composition API
const { StorageBrowser: ComposableStorageBrowser } = createStorageBrowser({
  config: createAmplifyAuthAdapter(),
});

function PaginationCompositionTest() {
  const [globalPageSize, setGlobalPageSize] = useState<number>(100);
  const [locationsPageSize, setLocationsPageSize] = useState<number>(25);
  const [detailPageSize, setDetailPageSize] = useState<number>(50);
  const [uploadPageSize, setUploadPageSize] = useState<number>(30);
  const [copyPageSize, setCopyPageSize] = useState<number>(20);
  const [deletePageSize, setDeletePageSize] = useState<number>(15);
  const [downloadPageSize, setDownloadPageSize] = useState<number>(25);
  const [showAlert, setShowAlert] = useState(true);

  const pageSizeOptions = [
    { value: 10, label: '10 items' },
    { value: 20, label: '20 items' },
    { value: 25, label: '25 items' },
    { value: 30, label: '30 items' },
    { value: 50, label: '50 items' },
    { value: 100, label: '100 items' },
    { value: 200, label: '200 items' },
  ];

  return (
    <Flex direction="column" width="100vw" height="100vh" padding="xl">
      {showAlert && (
        <Alert
          variation="info"
          isDismissible
          onDismiss={() => setShowAlert(false)}
          marginBlockEnd="medium"
        >
          <Text>
            <strong>🧪 StorageBrowser Per-View Pagination Test</strong>
            <br />
            Testing per-view pageSize configuration. Each view can override the
            global pageSize. LocationsView: {locationsPageSize},
            LocationDetailView: {detailPageSize}, UploadView: {uploadPageSize},
            CopyView: {copyPageSize}, DeleteView: {deletePageSize},
            DownloadView: {downloadPageSize}, Global: {globalPageSize} items.
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
          Per-View Pagination Configuration
        </Text>

        <Flex alignItems="center" gap="large" wrap="wrap">
          <Flex alignItems="center" gap="small">
            <Text fontWeight="bold">Global:</Text>
            <SelectField
              label=""
              value={globalPageSize.toString()}
              onChange={(e) => setGlobalPageSize(parseInt(e.target.value))}
              width="100px"
            >
              {pageSizeOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </SelectField>
          </Flex>

          <Flex alignItems="center" gap="small">
            <Text fontWeight="bold">Locations:</Text>
            <SelectField
              label=""
              value={locationsPageSize.toString()}
              onChange={(e) => setLocationsPageSize(parseInt(e.target.value))}
              width="100px"
            >
              {pageSizeOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </SelectField>
          </Flex>

          <Flex alignItems="center" gap="small">
            <Text fontWeight="bold">Detail:</Text>
            <SelectField
              label=""
              value={detailPageSize.toString()}
              onChange={(e) => setDetailPageSize(parseInt(e.target.value))}
              width="100px"
            >
              {pageSizeOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </SelectField>
          </Flex>

          <Flex alignItems="center" gap="small">
            <Text fontWeight="bold">Upload:</Text>
            <SelectField
              label=""
              value={uploadPageSize.toString()}
              onChange={(e) => setUploadPageSize(parseInt(e.target.value))}
              width="100px"
            >
              {pageSizeOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </SelectField>
          </Flex>

          <Flex alignItems="center" gap="small">
            <Text fontWeight="bold">Copy:</Text>
            <SelectField
              label=""
              value={copyPageSize.toString()}
              onChange={(e) => setCopyPageSize(parseInt(e.target.value))}
              width="100px"
            >
              {pageSizeOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </SelectField>
          </Flex>

          <Flex alignItems="center" gap="small">
            <Text fontWeight="bold">Delete:</Text>
            <SelectField
              label=""
              value={deletePageSize.toString()}
              onChange={(e) => setDeletePageSize(parseInt(e.target.value))}
              width="100px"
            >
              {pageSizeOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </SelectField>
          </Flex>

          <Flex alignItems="center" gap="small">
            <Text fontWeight="bold">Download:</Text>
            <SelectField
              label=""
              value={downloadPageSize.toString()}
              onChange={(e) => setDownloadPageSize(parseInt(e.target.value))}
              width="100px"
            >
              {pageSizeOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </SelectField>
          </Flex>
        </Flex>
      </Flex>

      <Tabs
        defaultValue="composition"
        items={[
          {
            label: 'Composition Mode',
            value: 'composition',
            content: (
              <View height="100%" overflow="auto">
                <ComposableStorageBrowser.Provider
                  key={`${globalPageSize}-${locationsPageSize}-${detailPageSize}-${uploadPageSize}-${copyPageSize}-${deletePageSize}-${downloadPageSize}`}
                  pageSize={globalPageSize}
                >
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
            ),
          },
          {
            label: 'Standard Mode',
            value: 'standard',
            content: (
              <View height="600px" overflow="auto">
                <StorageBrowser
                  key={globalPageSize}
                  pageSize={globalPageSize}
                  displayText={{
                    LocationsView: {
                      title: `Standard StorageBrowser - ${globalPageSize} items per page (all views)`,
                    },
                  }}
                />
              </View>
            ),
          },
        ]}
      />
    </Flex>
  );
}

export default PaginationCompositionTest;
