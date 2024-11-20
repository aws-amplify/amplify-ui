import React from 'react';

import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';

import { Flex } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react-storage/styles.css';

const { StorageBrowser, useAction, useView } = createStorageBrowser({
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
      download: ({ data }) => {
        const { key } = data;
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
            permissions: ['delete', 'get', 'list', 'write'] as const,
            prefix: 'my-prefix',
            type: 'PREFIX',
          },
        ],
        nextToken: undefined,
      }),
  },
});

function Example() {
  return (
    <Flex
      direction="column"
      width="100vw"
      height="100vh"
      overflow="hidden"
      padding="xl"
    >
      <StorageBrowser />
    </Flex>
  );
}

export default Example;
