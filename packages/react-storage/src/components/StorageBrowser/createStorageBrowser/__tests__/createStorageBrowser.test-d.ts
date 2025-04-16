/* eslint-disable @typescript-eslint/no-unused-vars */
// This test is run by lint-stage to ensure exported type infers work as expected.
import type {
  CreateStorageBrowserInput,
  CreateStorageBrowserOutput,
} from '../types';
import type { defaultActionConfigs } from '../../actions';

/**
 * Test utilities:
 */
// Determine whether B is assignable to A
type Assignable<A, B> = B extends A ? 'YES' : 'NO';
// Assert the result from Assignable
type Equal<A extends 'YES' | 'NO', B extends A> = unknown;

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
  config: any;
};

/**
 * Test: Customer input type with both default and custom action should be assignable
 * to createStorageBrowser()
 */
type InputAssignability = Assignable<
  CreateStorageBrowserInput,
  CustomerStorageBrowserInput
>;
type InputAssignabilityResult = Equal<'YES', InputAssignability>;

/**
 * Suite: StorageBrowser component
 */
type InferredStorageBrowserType = CreateStorageBrowserOutput<
  CustomerStorageBrowserInput['actions']
>['StorageBrowser'];
type InferredStorageBrowserPropsType =
  Parameters<InferredStorageBrowserType>[0];
/**
 * Test: StorageBrowser component should support custom view and default view
 */
type ComponentViewsAssignability = Assignable<
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
>;
type ComponentViewsAssignabilityResult = Equal<
  'YES',
  ComponentViewsAssignability
>;
/**
 * Test: StorageBrowser component should NOT support random views
 */
type ComponentViewsNotAssignability = Assignable<
  InferredStorageBrowserPropsType['views'],
  {
    RandomView: () => JSX.Element;
  }
>;
type ComponentViewsNotAssignabilityResult = Equal<
  'NO',
  ComponentViewsNotAssignability
>;

/**
 * Suite: StorageBrowser provider
 */
type InferredStorageBrowserProviderType =
  InferredStorageBrowserType['Provider'];
type InferredStorageBrowserProviderPropsType =
  Parameters<InferredStorageBrowserProviderType>[0];
/**
 * Test: StorageBrowser provider should support ONLY custom view
 */
type ProviderViewsAssignability = Assignable<
  InferredStorageBrowserProviderPropsType['views'],
  {
    MyActionView: () => JSX.Element;
  }
>;
type ProviderViewsAssignabilityResult = Equal<
  'YES',
  ProviderViewsAssignability
>;
/**
 * Test: StorageBrowser provider should NOT support default views
 */
type ProviderViewsNotAssignability = Assignable<
  InferredStorageBrowserProviderPropsType['views'],
  {
    CopyView: () => JSX.Element;
  }
>;
type ProviderViewsNotAssignabilityResult = Equal<
  'NO',
  ProviderViewsNotAssignability
>;

/**
 * Suite: useAction() hook
 */
type InferredUseActionType = CreateStorageBrowserOutput<
  CustomerStorageBrowserInput['actions']
>['useAction'];
type InferredUseActionInputType = Parameters<InferredUseActionType>;
/**
 * Test: useAction() should accept default and custom actions
 */
type UseActionInputAssignabilityResult = {
  myAction1: Equal<'YES', Assignable<InferredUseActionInputType, ['myAction']>>;
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
  delete1: Equal<'YES', Assignable<InferredUseActionInputType, ['delete']>>;
  delete2: Equal<
    'YES',
    Assignable<
      InferredUseActionInputType,
      ['delete', { items: { key: string; id: string }[] }]
    >
  >;
  upload1: Equal<'YES', Assignable<InferredUseActionInputType, ['upload']>>;
  upload2: Equal<
    'YES',
    Assignable<
      InferredUseActionInputType,
      ['upload', { items: { key: string; id: string }[] }]
    >
  >;
  download1: Equal<'YES', Assignable<InferredUseActionInputType, ['download']>>;
  download2: Equal<
    'YES',
    Assignable<
      InferredUseActionInputType,
      ['download', { items: { key: string; id: string }[] }]
    >
  >;
};
/**
 * TEST: useAction() should NOT accept invalid or random actions
 */
type UseActionInputNotAssignabilityResult = {
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

/**
 * Suit: useView() hook
 */
type InferredUseViewType = CreateStorageBrowserOutput<
  CustomerStorageBrowserInput['actions']
>['useView'];
type InferredUseViewInputType = Parameters<InferredUseViewType>;
/**
 * Test: useView() should accept default and custom views
 */
type UseViewInputAssignabilityResult = {
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
  Locations: Equal<'YES', Assignable<InferredUseViewInputType, ['Locations']>>;
};
/**
 * TEST: useView() should NOT accept invalid or random views
 */
type UseViewInputNotAssignabilityResult = {
  randomView: Equal<'NO', Assignable<InferredUseViewInputType, ['RandomView']>>;
};
