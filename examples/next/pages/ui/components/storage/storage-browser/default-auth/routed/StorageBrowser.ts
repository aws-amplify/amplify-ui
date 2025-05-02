import { Amplify } from 'aws-amplify';

import {
  createAmplifyAuthAdapter,
  createStorageBrowser,
  defaultActionConfigs,
  defaultHandlers,
} from '@aws-amplify/ui-react-storage/browser';
import '@aws-amplify/ui-react-storage/styles.css';

import config from './aws-exports';

Amplify.configure(config);

const uploads = [];
const errors = [];
const fileUploadCounter = {
  add: (value: { key: string }) => {
    uploads.push(value);

    console.log('uploads', uploads);
  },
  recordError: (error: Error) => {
    errors.push(error);

    console.log('errors', errors);
  },
};

// example: checks if file is <= 1MB and is not a .webp image
const customIsFileValid = (file: File) =>
  file.size <= 1000 * 1000 && file.type !== 'image/webp';

export const { StorageBrowser } = createStorageBrowser({
  config: createAmplifyAuthAdapter(),
  actions: {
    default: {
      upload: {
        ...defaultActionConfigs.upload,
        handler: (input) => {
          const output = defaultHandlers.upload(input);

          output.result.then((result) => {
            const { error, status, value } = result;
            if (status === 'COMPLETE') {
              fileUploadCounter.add(value);
            } else if (
              status === 'FAILED' ||
              status === 'OVERWRITE_PREVENTED'
            ) {
              fileUploadCounter.recordError(error);
            }
          });

          return output;
        },
      },
    },
  },
  options: {
    onFileValidation: customIsFileValid,
  },
});
