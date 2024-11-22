import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
export const { StorageBrowser } = createStorageBrowser({
  config: {
    region: '',
    registerAuthListener: () => {},
    getLocationCredentials: () =>
      Promise.resolve({
        scope: '',
        credentials: {
          secretAccessKey: '',
          sessionToken: '',
          accessKeyId: '',
          expiration: new Date(),
        },
      }),
    listLocations: (input) =>
      Promise.resolve({
        items: [
          {
            bucket: 'test',
            id: '',
            permissions: ['delete', 'get', 'list', 'write'],
            prefix: 'test',
            type: 'PREFIX',
          },
        ],
        nextToken: null,
      }),
  },
});
