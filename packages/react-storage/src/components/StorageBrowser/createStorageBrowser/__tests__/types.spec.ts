/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jest/expect-expect */
// This test is intentionally skipped and should be run by lint-stage and ensures
// exported type infers work as expected.
import type {
  CreateStorageBrowserInput,
  CreateStorageBrowserOutput,
  StorageBrowserConfig,
} from '../types';
import type { defaultActionConfigs } from '../../actions';

/**
 * Test utilities:
 */
// Determine whether B is assignable to A
type Assignable<A, B> = B extends A ? 'YES' : 'NO';
// Assert the result from Assignable
type Equal<A extends 'YES' | 'NO', B extends A> = unknown;

describe.skip('createStorageBrowser() types', () => {
  type CustomerStorageBrowserInput = {
    actions: {
      default: typeof defaultActionConfigs;
      custom: {
        myAction: {
          handler: () => {
            result: Promise<{ status: 'COMPLETE' }>;
          };
          viewName: 'MyActionView';
          actionListItem: {
            icon: 'info';
            label: 'my action';
          };
        };
      };
    };
    config: StorageBrowserConfig;
  };

  type InferredStorageBrowserType = CreateStorageBrowserOutput<
    CustomerStorageBrowserInput['actions']
  >['StorageBrowser'];

  it('should accept customer input type with both default and custom action', () => {
    type Result = Equal<
      'YES',
      Assignable<CreateStorageBrowserInput, CustomerStorageBrowserInput>
    >;
  });

  describe('StorageBrowser component', () => {
    type InferredStorageBrowserPropsType =
      Parameters<InferredStorageBrowserType>[0];

    it('should support custom view and default view', () => {
      type Result = Equal<
        'YES',
        Assignable<
          InferredStorageBrowserPropsType['views'],
          {
            CopyView: () => JSX.Element;
            CreateFolderView: () => JSX.Element;
            DeleteView: () => JSX.Element;
            LocationActionView: () => JSX.Element;
            LocationDetailView: () => JSX.Element;
            LocationsView: () => JSX.Element;
            UploadView: () => JSX.Element;
            MyActionView: () => JSX.Element;
          }
        >
      >;
    });

    it('should NOT support random views', () => {
      type ComponentViewsNotAssignability = Assignable<
        InferredStorageBrowserPropsType['views'],
        {
          RandomView: () => JSX.Element;
        }
      >;
      type Result = Equal<'NO', ComponentViewsNotAssignability>;
    });
  });

  describe('StorageBrowser provider', () => {
    type InferredStorageBrowserProviderType =
      InferredStorageBrowserType['Provider'];
    type InferredStorageBrowserProviderPropsType =
      Parameters<InferredStorageBrowserProviderType>[0];
    it('should support custom view and default view', () => {
      type Result = Equal<
        'YES',
        Assignable<
          InferredStorageBrowserProviderPropsType['views'],
          {
            CopyView: () => JSX.Element;
            CreateFolderView: () => JSX.Element;
            DeleteView: () => JSX.Element;
            LocationActionView: () => JSX.Element;
            LocationDetailView: () => JSX.Element;
            LocationsView: () => JSX.Element;
            UploadView: () => JSX.Element;
            MyActionView: () => JSX.Element;
          }
        >
      >;
    });

    it('should NOT support random views', () => {
      type ProviderViewsNotAssignability = Assignable<
        InferredStorageBrowserProviderPropsType['views'],
        {
          RandomView: () => JSX.Element;
        }
      >;
      type Result = Equal<'NO', ProviderViewsNotAssignability>;
    });
  });

  describe('useAction() hook', () => {
    type InferredUseActionType = CreateStorageBrowserOutput<
      CustomerStorageBrowserInput['actions']
    >['useAction'];
    type InferredUseActionInputType = Parameters<InferredUseActionType>;

    it('should accept default and custom actions', () => {
      type Result = {
        myAction1: Equal<
          'YES',
          Assignable<InferredUseActionInputType, ['myAction']>
        >;
        myAction2: Equal<
          'YES',
          Assignable<
            InferredUseActionInputType,
            ['myAction', { items: { key: string; id: string }[] }]
          >
        >;
        copy1: Equal<'YES', Assignable<InferredUseActionInputType, ['copy']>>;
        copy2: Equal<
          'YES',
          Assignable<
            InferredUseActionInputType,
            ['copy', { items: { key: string; id: string }[] }]
          >
        >;
        createFolder1: Equal<
          'YES',
          Assignable<InferredUseActionInputType, ['createFolder']>
        >;
        createFolder2: Equal<
          'YES',
          Assignable<
            InferredUseActionInputType,
            ['createFolder', { items: { key: string; id: string }[] }]
          >
        >;
        delete1: Equal<
          'YES',
          Assignable<InferredUseActionInputType, ['delete']>
        >;
        delete2: Equal<
          'YES',
          Assignable<
            InferredUseActionInputType,
            ['delete', { items: { key: string; id: string }[] }]
          >
        >;
        upload1: Equal<
          'YES',
          Assignable<InferredUseActionInputType, ['upload']>
        >;
        upload2: Equal<
          'YES',
          Assignable<
            InferredUseActionInputType,
            ['upload', { items: { key: string; id: string }[] }]
          >
        >;
        download1: Equal<
          'YES',
          Assignable<InferredUseActionInputType, ['download']>
        >;
        download2: Equal<
          'YES',
          Assignable<
            InferredUseActionInputType,
            ['download', { items: { key: string; id: string }[] }]
          >
        >;
      };
    });

    it('should NOT accept random actions', () => {
      type Result = {
        listLocations: Equal<
          'NO',
          Assignable<
            InferredUseActionInputType,
            ['listLocations', { items: { key: string; id: string }[] }]
          >
        >;
        listLocationItems: Equal<
          'NO',
          Assignable<InferredUseActionInputType, ['listLocationItems']>
        >;
        randomAction: Equal<
          'NO',
          Assignable<InferredUseActionInputType, ['randomAction']>
        >;
      };
    });
  });

  describe('useView() hook', () => {
    type InferredUseViewType = CreateStorageBrowserOutput<
      CustomerStorageBrowserInput['actions']
    >['useView'];
    type InferredUseViewInputType = Parameters<InferredUseViewType>;

    it('should accept default and custom views', () => {
      type Result = {
        copy: Equal<'YES', Assignable<InferredUseViewInputType, ['Copy']>>;
        createFolder: Equal<
          'YES',
          Assignable<InferredUseViewInputType, ['CreateFolder']>
        >;
        delete: Equal<'YES', Assignable<InferredUseViewInputType, ['Delete']>>;
        upload: Equal<'YES', Assignable<InferredUseViewInputType, ['Upload']>>;
        locationDetail: Equal<
          'YES',
          Assignable<InferredUseViewInputType, ['LocationDetail']>
        >;
        Locations: Equal<
          'YES',
          Assignable<InferredUseViewInputType, ['Locations']>
        >;
      };
    });

    it('should NOT accept invalid or random views', () => {
      type Result = {
        randomView: Equal<
          'NO',
          Assignable<InferredUseViewInputType, ['RandomView']>
        >;
      };
    });
  });
});
