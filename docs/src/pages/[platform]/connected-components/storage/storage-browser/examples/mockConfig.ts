import { CreateStorageBrowserInput } from '@aws-amplify/ui-react-storage/dist/types/components/StorageBrowser';

export const mockConfig: CreateStorageBrowserInput['config'] = {
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
};
