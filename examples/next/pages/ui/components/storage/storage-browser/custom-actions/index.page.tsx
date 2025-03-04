import React, { PropsWithChildren } from 'react';
import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
import { Flex, Message } from '@aws-amplify/ui-react';
import './styles.css';

import '@aws-amplify/ui-react-storage/styles.css';

class CustomErrorBoundary extends React.Component<Required<PropsWithChildren>> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Message variation="outlined" colorTheme="error">
          Oops. An unexpected error has happened.
        </Message>
      );
    }

    return this.props.children;
  }
}

const { StorageBrowser, useView } = createStorageBrowser({
  actions: {
    default: {
      copy: {
        actionListItem: {
          icon: 'copy-file',
          label: 'Override Copy',
        },
        handler: ({ data }) => {
          const { key } = data;
          return {
            result: Promise.resolve({ status: 'COMPLETE', value: { key } }),
          };
        },
        viewName: 'CopyView',
      },
      createFolder: {
        actionListItem: {
          icon: 'create-folder',
          label: 'Override Create Folder',
        },
        handler: ({ data }) => {
          const { key } = data;
          return {
            result: Promise.resolve({ status: 'COMPLETE', value: { key } }),
          };
        },
        viewName: 'CreateFolderView',
      },
      delete: {
        actionListItem: {
          icon: 'delete-file',
          label: 'Override Delete',
        },
        handler: ({ data }) => {
          const { key } = data;
          return {
            result: Promise.resolve({ status: 'COMPLETE', value: { key } }),
          };
        },
        viewName: 'DeleteView',
      },
      download: () => {
        return {
          result: Promise.resolve({
            status: 'COMPLETE',
            value: { url: new URL('') },
          }),
        };
      },
      upload: {
        actionListItem: {
          icon: 'upload-file',
          label: 'Override Upload',
        },
        handler: ({ data }) => {
          const { key } = data;
          return {
            result: Promise.resolve({ status: 'COMPLETE', value: { key } }),
          };
        },
        viewName: 'UploadView',
      },
      listLocationItems: () =>
        Promise.resolve({
          items: [
            {
              id: 'jaskjkaska',
              key: 'item-key',
              lastModified: new Date(),
              size: 1008,
              type: 'FILE' as const,
            },
          ],
          nextToken: undefined,
        }),
    },
    custom: {
      mockRuntimeError: {
        actionListItem: {
          icon: 'error',
          label: 'Mock unexpected error',
        },
        // Not used but to keep ts happy
        handler: () => ({
          result: Promise.resolve({
            status: 'COMPLETE',
            value: { key: 'trigger-runtime-error' },
          }),
        }),
        viewName: 'LocationDetailView',
      },
    },
  },
  components: {
    ErrorBoundary: CustomErrorBoundary,
  },
  config: {
    getLocationCredentials: () =>
      Promise.resolve({
        credentials: {
          accessKeyId: '',
          expiration: new Date(),
          secretAccessKey: '',
          sessionToken: '',
        },
      }),
    region: '',
    registerAuthListener: () => null,
    listLocations: () =>
      Promise.resolve({
        items: [
          {
            bucket: 'my-bucket',
            id: crypto.randomUUID(),
            permissions: ['delete', 'get', 'list', 'write'],
            prefix: 'my-prefix',
            type: 'PREFIX',
          },
        ],
        nextToken: undefined,
      }),
  },
});

function LocationDetailViewWithExpectedError() {
  const { actionType } = useView('LocationDetail');

  if (actionType === 'mockRuntimeError') {
    throw new Error('Unexpected Error');
  }

  return <StorageBrowser.LocationDetailView />;
}

function Example() {
  return (
    <Flex
      direction="column"
      width="100vw"
      height="100vh"
      overflow="hidden"
      padding="xl"
    >
      <StorageBrowser
        views={{
          LocationDetailView: LocationDetailViewWithExpectedError,
        }}
      />
    </Flex>
  );
}

export default Example;
