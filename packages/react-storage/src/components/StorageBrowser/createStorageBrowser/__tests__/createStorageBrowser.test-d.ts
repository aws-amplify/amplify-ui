import { createStorageBrowser } from '..';
import { DefaultActionConfigs } from '../../actions/configs';
import {
  ListLocationItemsActionViewSubComponents,
  ListLocationsActionViewSubComponents,
  TaskActionViewComponent,
  ViewComponent,
} from '../types';

type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

describe('createStorageBrowser() type generation', () => {
  test('generate correct StorageBrowser type without any custom actions', () => {
    const { StorageBrowser } = createStorageBrowser({
      config: {} as any,
    });

    type _ = Expect<
      typeof StorageBrowser extends {
        (props: Record<string, unknown>): React.JSX.Element;
        displayName: string;
        Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
        readonly LocationDetailView: ViewComponent<
          ListLocationItemsActionViewSubComponents,
          {}
        >;
        readonly LocationsView: ViewComponent<
          ListLocationsActionViewSubComponents,
          {}
        >;
        readonly CreateFolderView: TaskActionViewComponent<{}>;
        readonly UploadView: TaskActionViewComponent<{}>;
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
          includeProgress: false,
        },
        CropAll: {
          componentName: 'CropAllImagesView',
          handler: () => {},
          isCancelable: false,
          displayName: 'Crop All',
          includeProgress: false,
        },
      },
    });

    type _ = Expect<
      typeof StorageBrowser extends {
        (props: Record<string, unknown>): React.JSX.Element;
        displayName: string;
        Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
        readonly MyShareView: TaskActionViewComponent<{}>;
        readonly CropAllImagesView: TaskActionViewComponent<{}>;
        readonly LocationDetailView: ViewComponent<
          ListLocationItemsActionViewSubComponents,
          {}
        >;
        readonly LocationsView: ViewComponent<
          ListLocationsActionViewSubComponents,
          {}
        >;
        readonly CreateFolderView: TaskActionViewComponent<{}>;
        readonly UploadView: TaskActionViewComponent<{}>;
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
        },
        Share: {
          componentName: 'MyShareView',
          handler: () => {},
          isCancelable: false,
          displayName: 'Share',
        },
        someOtherAction: {
          componentName: 'SomeOtherView',
          handler: () => {},
          isCancelable: false,
          displayName: 'Some Other Action',
        },
      },
    });

    type _ = Expect<
      typeof StorageBrowser extends {
        (props: Record<string, unknown>): React.JSX.Element;
        displayName: string;
        Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
        readonly MyShareView: TaskActionViewComponent<{}>;
        readonly SomeOtherView: TaskActionViewComponent<{}>;
        readonly CreateFolderView: TaskActionViewComponent<{}>;
        readonly LocationDetailView: ViewComponent<
          ListLocationItemsActionViewSubComponents,
          {}
        >;
        readonly LocationsView: ViewComponent<
          ListLocationsActionViewSubComponents,
          {}
        >;
        readonly UploadView: TaskActionViewComponent<{}>;
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
          displayName: 'Create Folder',
        },
        Upload: {
          // @ts-expect-error doesn't allow different componentName
          componentName: 'SomeOtherComponentName',
          handler: () => {
            throw new Error('Not implemented for testing');
          },
          displayName: 'Upload',
        },
        ListLocationItems: {
          // @ts-expect-error doesn't allow different componentName
          componentName: 'SomeOtherComponentName',
          handler: () => {
            throw new Error('Not implemented for testing');
          },
          // @ts-expect-error doesn't allow different displayName
          displayName: 'LocationItems',
        },
        ListLocations: {
          // @ts-expect-error doesn't allow different componentName
          componentName: 'SomeOtherComponentName',
          handler: () => {
            throw new Error('Not implemented for testing');
          },
          displayName: 'Locations',
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
          // @ts-expect-error cannot specify non-defined property
          randomValues: 'random',
        },
      },
    });

    type _ = Expect<
      typeof StorageBrowser extends {
        (props: Record<string, unknown>): React.JSX.Element;
        displayName: string;
        Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
        readonly LocationDetailView: ViewComponent<
          ListLocationItemsActionViewSubComponents,
          {}
        >;
        readonly LocationsView: ViewComponent<
          ListLocationsActionViewSubComponents,
          {}
        >;
        readonly CreateFolderView: TaskActionViewComponent<{}>;
        readonly UploadView: TaskActionViewComponent<{}>;
      }
        ? true
        : false
    >;

    expect('done').toBe('done');
  });

  test('generate correct type for created `useAction`', () => {
    const { useAction } = createStorageBrowser({
      config: {} as any,
      actions: {
        Share: {
          componentName: 'MyShareView',
          handler: () => {},
          isCancelable: false,
          displayName: 'Share',
          includeProgress: false,
        },
      },
    });

    type ParamType = Parameters<typeof useAction>[0];
    type _ = Expect<Equal<ParamType, keyof DefaultActionConfigs | 'Share'>>;

    expect('done').toBe('done');
  });
});
