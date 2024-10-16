import { createStorageBrowser } from '..';
import { DerivedSubComponents } from '../types';

type Expect<T extends true> = T;

describe('createStorageBrowser() type generation', () => {
  test('generate correct StorageBrowser type without any custom actions', () => {
    const { StorageBrowser } = createStorageBrowser({
      config: {} as any,
    });

    type _ = Expect<
      typeof StorageBrowser extends {
        (props: {
          type:
            | 'LocationDetailView'
            | 'LocationsView'
            | 'CreateFolderView'
            | 'UploadView';
        }): React.JSX.Element;
        displayName: string;
        Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
        readonly LocationDetailView: DerivedSubComponents<
          'LIST_LOCATION_ITEMS',
          object
        >;
        readonly LocationsView: DerivedSubComponents<'LIST_LOCATIONS', object>;
        readonly CreateFolderView: DerivedSubComponents<
          'SINGLE_ACTION',
          object
        >;
        readonly UploadView: DerivedSubComponents<'BATCH_ACTION', object>;
      }
        ? true
        : false
    >;

    expect('done').toBe('done');
  });

  test('generate correct StorageBrowser type with custom actions', () => {
    const { StorageBrowser } = createStorageBrowser({
      config: {} as any,
      actions: {
        Share: {
          componentName: 'MyShareView',
          handler: () => {},
          isCancelable: false,
          displayName: 'Share',
          type: 'SINGLE_ACTION',
        },
        CropAll: {
          componentName: 'CropAllImages',
          handler: () => {},
          isCancelable: true,
          displayName: 'CropAllImages',
          type: 'BATCH_ACTION',
        },
      },
    });

    type _ = Expect<
      typeof StorageBrowser extends {
        (props: {
          type:
            | 'LocationDetailView'
            | 'LocationsView'
            | 'CreateFolderView'
            | 'UploadView'
            | 'MyShareView'
            | 'CropAllImages';
        }): React.JSX.Element;
        displayName: string;
        Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
        readonly MyShareView: DerivedSubComponents<'SINGLE_ACTION', object>;
        readonly CropAllImages: DerivedSubComponents<'BATCH_ACTION', object>;
        readonly LocationDetailView: DerivedSubComponents<
          'LIST_LOCATION_ITEMS',
          object
        >;
        readonly LocationsView: DerivedSubComponents<'LIST_LOCATIONS', object>;
        readonly CreateFolderView: DerivedSubComponents<
          'SINGLE_ACTION',
          object
        >;
        readonly UploadView: DerivedSubComponents<'BATCH_ACTION', object>;
      }
        ? true
        : false
    >;

    expect('done').toBe('done');
  });

  test('generate correct StorageBrowser type with custom actions and overriding actions', () => {
    const { StorageBrowser } = createStorageBrowser({
      config: {} as any,
      actions: {
        CreateFolder: {
          componentName: 'CreateFolderView',
          handler: () => {
            throw new Error('Not implemented for testing');
          },
          isCancelable: false,
          displayName: 'Create Folder',
          type: 'SINGLE_ACTION',
        },
        Share: {
          componentName: 'MyShareView',
          handler: () => {},
          isCancelable: false,
          displayName: 'Share',
          type: 'SINGLE_ACTION',
        },
      },
    });

    type _ = Expect<
      typeof StorageBrowser extends {
        (props: {
          type:
            | 'LocationDetailView'
            | 'LocationsView'
            | 'CreateFolderView'
            | 'UploadView'
            | 'MyShareView';
        }): React.JSX.Element;
        displayName: string;
        Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
        readonly MyShareView: DerivedSubComponents<'SINGLE_ACTION', object>;
        readonly LocationDetailView: DerivedSubComponents<
          'LIST_LOCATION_ITEMS',
          object
        >;
        readonly LocationsView: DerivedSubComponents<'LIST_LOCATIONS', object>;
        readonly CreateFolderView: DerivedSubComponents<
          'SINGLE_ACTION',
          object
        >;
        readonly UploadView: DerivedSubComponents<'BATCH_ACTION', object>;
      }
        ? true
        : false
    >;

    expect('done').toBe('done');
  });

  test('cannot override certain fields while specifying default action overrides', () => {
    createStorageBrowser({
      config: {} as any,
      actions: {
        CreateFolder: {
          // @ts-expect-error doesn't allow different componentName
          componentName: 'SomeOtherComponentName',
          handler: () => {
            throw new Error('Not implemented for testing');
          },
          // @ts-expect-error doesn't allow different isCancelable
          isCancelable: true,
          displayName: 'Create Folder',
          // @ts-expect-error doesn't allow different type
          type: 'LIST_LOCATIONS',
        },
        Upload: {
          // @ts-expect-error doesn't allow different componentName
          componentName: 'SomeOtherComponentName',
          handler: () => {
            throw new Error('Not implemented for testing');
          },
          // @ts-expect-error doesn't allow different isCancelable
          isCancelable: false,
          displayName: 'Upload',
          // @ts-expect-error doesn't allow different type
          type: 'LIST_LOCATIONS',
        },
        ListLocationItems: {
          // @ts-expect-error doesn't allow different componentName
          componentName: 'SomeOtherComponentName',
          handler: () => {
            throw new Error('Not implemented for testing');
          },
          // @ts-expect-error doesn't allow different displayName
          displayName: 'LocationItems',
          // @ts-expect-error doesn't allow different type
          type: 'LIST_LOCATIONS',
        },
        ListLocations: {
          // @ts-expect-error doesn't allow different componentName
          componentName: 'SomeOtherComponentName',
          handler: () => {
            throw new Error('Not implemented for testing');
          },
          displayName: 'Locations',
          // @ts-expect-error doesn't allow different type
          type: 'LIST_LOCATION_ITEMS',
        },
      },
    });

    expect('done').toBe('done');
  });

  test('should ignore custom actions with non-capitalized key', () => {
    const { StorageBrowser } = createStorageBrowser({
      config: {} as any,
      actions: {
        nonCapitalizedKey: {
          randomValues: 'random',
        },
      },
    });

    type _ = Expect<
      typeof StorageBrowser extends {
        (props: {
          type:
            | 'LocationDetailView'
            | 'LocationsView'
            | 'CreateFolderView'
            | 'UploadView';
        }): React.JSX.Element;
        displayName: string;
        Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
        readonly LocationDetailView: DerivedSubComponents<
          'LIST_LOCATION_ITEMS',
          object
        >;
        readonly LocationsView: DerivedSubComponents<'LIST_LOCATIONS', object>;
        readonly CreateFolderView: DerivedSubComponents<
          'SINGLE_ACTION',
          object
        >;
        readonly UploadView: DerivedSubComponents<'BATCH_ACTION', object>;
      }
        ? true
        : false
    >;

    expect('done').toBe('done');
  });
});
