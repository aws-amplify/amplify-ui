import {
  createStorageBrowser,
  defaultActionConfigs,
} from '@aws-amplify/ui-react-storage/browser';
import '@aws-amplify/ui-react-storage/styles.css';
import {
  InitialValues,
  MockHandlers,
} from '@aws-amplify/ui-test-utils/storage-browser';

export const PREFIXES = {
  base: 'my-prefix/',
  nested: 'my-nested-prefix/',
  deeplyNested: 'my-deeply-nested-prefix/',
} as const;

export const INITIAL_VALUES: InitialValues = {
  locations: [
    {
      bucket: 'my-bucket',
      id: crypto.randomUUID(),
      permissions: ['delete', 'get', 'list', 'write'],
      prefix: PREFIXES.base,
      type: 'PREFIX',
    },
  ],
  locationItems: {
    [PREFIXES.base]: [
      {
        id: crypto.randomUUID(),
        key: `${PREFIXES.base}${PREFIXES.nested}`,
        type: 'FOLDER',
      },
    ],
    [`${PREFIXES.base}${PREFIXES.nested}`]: [
      {
        id: crypto.randomUUID(),
        key: `${PREFIXES.base}${PREFIXES.nested}${PREFIXES.deeplyNested}`,
        type: 'FOLDER',
      },
    ],
    [`${PREFIXES.base}${PREFIXES.nested}${PREFIXES.deeplyNested}`]: [],
  },
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
});
