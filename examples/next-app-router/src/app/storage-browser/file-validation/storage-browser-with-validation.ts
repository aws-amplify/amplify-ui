import {
  createStorageBrowser,
  defaultActionConfigs,
} from '@aws-amplify/ui-react-storage/browser';
import { MockHandlers } from '@aws-amplify/ui-test-utils/storage-browser';

import { INITIAL_VALUES } from '../storage-browser';

import '@aws-amplify/ui-react-storage/styles.css';

const customValidateFile = (file: File) => {
  const validFileSize = file.size <= 1000 * 1000; // 1MB
  const onlyImages = ['image/gif', 'image/jpeg', 'image/png'].includes(
    file.type
  );
  return validFileSize && onlyImages;
};

const handlers = new MockHandlers({ initialValues: INITIAL_VALUES });

export const { StorageBrowser } = createStorageBrowser({
  actions: {
    default: {
      ...defaultActionConfigs,
      copy: {
        ...defaultActionConfigs.copy,
        handler: handlers.copy,
      },
      createFolder: {
        ...defaultActionConfigs.createFolder,
        handler: handlers.createFolder,
      },
      delete: {
        ...defaultActionConfigs.delete,
        handler: handlers.delete,
      },
      download: handlers.download,
      listLocationItems: handlers.listLocationItems,
      upload: {
        ...defaultActionConfigs.upload,
        handler: handlers.upload,
      },
    },
  },
  config: {
    listLocations: handlers.listLocations,
    region: '',
    registerAuthListener: () => null,
    getLocationCredentials: () =>
      Promise.resolve({
        credentials: {
          accessKeyId: 'accessKeyId',
          expiration: new Date(),
          secretAccessKey: 'secretAccessKey',
          sessionToken: 'sessionToken',
        },
      }),
  },
  options: {
    validateFile: customValidateFile,
  },
});
