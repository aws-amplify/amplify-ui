import { CreateStorageBrowserInput } from '@aws-amplify/ui-react-storage/dist/types/components/StorageBrowser';
import { locations } from './locations';

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
      items: locations,
      nextToken: null,
    }),
};
