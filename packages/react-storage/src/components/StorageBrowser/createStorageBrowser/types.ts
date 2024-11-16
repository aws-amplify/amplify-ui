import {
  ActionConfigs,
  ComponentName,
  DefaultActionConfigs,
  DefaultActionKey,
} from '../actions/configs';
import { createUseAction } from '../actions/createUseAction';
import { StorageBrowserElements } from '../context/elements';
import { GetLocationCredentials } from '../credentials/types';
import { RegisterAuthListener } from '../providers';
import { ListLocations } from '../storage-internal';

interface Config {
  accountId?: string;
  getLocationCredentials: GetLocationCredentials;
  listLocations: ListLocations;
  registerAuthListener: RegisterAuthListener;
  region: string;
}

interface CreateStorageBrowserInput<T extends ActionConfigs> {
  config: Config;
  elements?: Partial<StorageBrowserElements>;
  actions?: T;
}

interface CreateStorageBrowserOutput<T extends ActionConfigs> {
  StorageBrowser: {
    (props: Record<string, unknown>): React.JSX.Element;
    displayName: string;
    Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
  } & DerivedViews<T>; // & the action derived views components
  useAction: ReturnType<typeof createUseAction<DefaultActionConfigs & T>>;
}

export interface CreateStorageBrowser {
  <
    T extends ActionConfigs &
      Partial<DefaultActionConfigs> = Partial<DefaultActionConfigs>,
  >(
    input: CreateStorageBrowserInput<T>
  ): CreateStorageBrowserOutput<T & ActionConfigs<DefaultActionKey>>;
}

interface LocationActionViewProps<T> {
  type?: T;
}

type LocationActionViewComponent<T> = (
  props: LocationActionViewProps<T>
) => React.JSX.Element;

// Custom actions derived views
type CustomActionViews<T> = {
  readonly [K in keyof T as K extends DefaultActionKey
    ? never
    : T[K] extends { componentName: ComponentName }
    ? T[K]['componentName']
    : never]: TaskActionViewComponent;
};

export type ViewComponent<T, K = {}> = {
  (props: K): React.JSX.Element;
  displayName: string;
  Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
} & T;

/**
 * task action view component & sub-components interface
 */
export type TaskActionViewComponent<T = {}> = ViewComponent<
  TaskActionViewSubComponents & T
>;

interface DefaultActionViews {
  ListLocationItems: {
    componentName: 'LocationDetailView';
    subComponents: ViewComponent<ListLocationItemsActionViewSubComponents>;
  };
  ListLocations: {
    componentName: 'LocationsView';
    subComponents: ViewComponent<ListLocationsActionViewSubComponents>;
  };
  Upload: {
    componentName: 'UploadView';
    // TODO: pass in the generic parameter
    subComponents: TaskActionViewComponent;
  };
  // temp: needs full subcomp defintions
  CreateFolder: {
    componentName: 'CreateFolderView';
    subComponents: TaskActionViewComponent;
  };
}

/**
 * Create derived views from both custom actions and default actions.
 *
 * One can override default actions, but the view interface of the default actions
 * remain the same.
 */
type DerivedViews<T> = CustomActionViews<T> & {
  readonly [K in keyof T as K extends keyof DefaultActionViews
    ? DefaultActionViews[K]['componentName']
    : never]: K extends keyof DefaultActionViews
    ? DefaultActionViews[K]['subComponents']
    : never;
} & {
  readonly LocationActionView: LocationActionViewComponent<
    // exclude list view actions
    Exclude<keyof T, 'ListLocationItems' | 'ListLocations'>
  >;
};

interface DefaultViewSubComponentProps {
  className?: string;
}

export interface TaskActionViewSubComponents {
  Title: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Trigger: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Cancel: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Table: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  StatusDisplay: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Destination: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Exit: (props: DefaultViewSubComponentProps) => React.JSX.Element;
}

export interface ListLocationsActionViewSubComponents {
  Title: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Table: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Search: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Refresh: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Paginate: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Message: (props: DefaultViewSubComponentProps) => React.JSX.Element;
}

export interface ListLocationItemsActionViewSubComponents
  extends ListLocationsActionViewSubComponents {
  ActionList: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Navigate: (props: DefaultViewSubComponentProps) => React.JSX.Element;
}
