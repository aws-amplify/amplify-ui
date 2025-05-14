import {
  CreateStorageBrowserInput,
  DeleteHandlerOutput,
  UploadHandlerOutput,
} from '@aws-amplify/ui-react-storage/browser';
import uniqueId from 'lodash/uniqueId';

export const defaultActions: CreateStorageBrowserInput['actions']['default'] = {
  copy: {
    actionListItem: {
      icon: 'copy-file',
      label: 'Copy',
    },
    handler: ({ data }) => {
      const { key } = data;
      return {
        result: Promise.resolve({
          status: 'COMPLETE' as const,
          value: { key },
        }),
      };
    },
    viewName: 'CopyView',
  },
  createFolder: {
    actionListItem: {
      icon: 'create-folder',
      label: 'Create Folder',
    },
    handler: ({ data }) => {
      const { key } = data;
      return {
        result: Promise.resolve({
          status: 'COMPLETE' as const,
          value: { key },
        }),
      };
    },
    viewName: 'CreateFolderView',
  },
  delete: {
    actionListItem: {
      icon: 'delete-file',
      label: 'Delete',
    },
    handler: ({ data }) => {
      const { key } = data;
      const result: DeleteHandlerOutput['result'] = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: 'COMPLETE' as const,
            value: { key },
          });
        }, 500);
      });
      return {
        result,
      };
    },
    viewName: 'DeleteView',
  },
  download: () => {
    return {
      result: Promise.resolve({
        status: 'COMPLETE' as const,
        value: { url: new URL('') },
      }),
    };
  },
  upload: {
    actionListItem: {
      icon: 'upload-file',
      label: 'Upload',
    },
    handler: ({ data, options }) => {
      // This code is modified from storageMock.ts
      // it mimicks uploading a file
      const { key, id } = data;
      const delay = Math.random() * 100;

      let progress = 0;
      let tick;
      let interval;

      const tickCreator = (cb?: () => void, increment?: number) => () => {
        if (progress < 0.9) {
          progress += increment || 0.1;
          if (typeof options.onProgress === 'function') {
            options.onProgress({ key, id }, progress);
          }
        } else {
          clearInterval(interval);
          if (typeof cb === 'function') cb();
        }
      };

      const result: UploadHandlerOutput['result'] = new Promise(
        (resolve, reject) => {
          clearInterval(interval);
          tick = tickCreator(() => {
            resolve({
              status: 'COMPLETE',
              value: { key },
            });
          }, 0.1);
          interval = setInterval(tick, delay);
        }
      );

      return {
        result,
      };
    },
    viewName: 'UploadView',
  },
  listLocationItems: (props) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          items: [
            {
              id: uniqueId(),
              key: `${props.prefix}test-file.txt`,
              lastModified: new Date(),
              size: 1008,
              type: 'FILE' as const,
            },
            {
              id: uniqueId(),
              key: `${props.prefix}test-file2.txt`,
              lastModified: new Date(),
              size: 23456,
              type: 'FILE' as const,
            },
            {
              id: uniqueId(),
              key: `${props.prefix}test-file3.txt`,
              lastModified: new Date(),
              size: 43456,
              type: 'FILE' as const,
            },
            {
              id: uniqueId(),
              key: `${props.prefix}test/`,
              type: 'FOLDER' as const,
            },
          ],
          nextToken: undefined,
        });
      }, 1000);
    });
  },
};
