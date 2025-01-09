import { ListLocationsOutput } from '@aws-amplify/ui-react-storage/dist/types/components/StorageBrowser/actions';

export const locations: ListLocationsOutput['items'] = [
  {
    bucket: 'test',
    id: '1234',
    permissions: ['delete', 'get', 'list', 'write'],
    prefix: 'test/',
    type: 'PREFIX',
  },
  {
    bucket: 'test-bucket',
    id: '4567',
    permissions: ['get', 'list'],
    prefix: '',
    type: 'BUCKET',
  },
  {
    bucket: 'test',
    id: '',
    permissions: ['delete', 'get', 'list', 'write'],
    prefix: 'some/path/',
    type: 'PREFIX',
  },
];
