import {
  ActionConfigs,
  DefaultActionConfigs,
  DefaultActionKeys,
} from '../actions/configs';
import { createUseAction } from '../actions/createUseAction';
import { StorageBrowserElements } from '../context/elements';
import { Config } from '../createProvider';

interface CreateStorageBrowserInput<T extends ActionConfigs> {
  config: Config;
  elements?: Partial<StorageBrowserElements>;
  actions?: T;
}

interface CreateStorageBrowserOutput<T extends ActionConfigs> {
  StorageBrowser: {
    (props: { type: DerivedComponentName<T> }): React.JSX.Element;
    displayName: string;
    Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
  } & DerivedViews<T>; // & the action derived views components
  useAction: ReturnType<typeof createUseAction<DefaultActionConfigs & T>>;
}

export interface CreateStorageBrowser {
  <
    DefinedActionConfigs extends ActionConfigs &
      Partial<DefaultActionConfigs> = Partial<DefaultActionConfigs>,
  >(
    input: CreateStorageBrowserInput<DefinedActionConfigs>
  ): CreateStorageBrowserOutput<
    DefinedActionConfigs & ActionConfigs<DefaultActionKeys>
  >;
}

/**
 * Extract component names from action configs to a string union.
 */
type DerivedComponentName<T> = keyof ({
  [Key in keyof DefaultActionConfigs as DefaultActionConfigs[Key] extends {
    componentName: Capitalize<string>;
  }
    ? DefaultActionConfigs[Key]['componentName']
    : never]: undefined;
} & {
  [Key in keyof T as Key extends DefaultActionKeys
    ? never
    : T[Key] extends {
        componentName: Capitalize<string>;
      }
    ? T[Key]['componentName']
    : never]: undefined;
});

/**
 * Create derived views from both custom actions and default actions.
 *
 * One can override default actions, but the view interface of the default actions
 * remain the same.
 */
type DerivedViews<T> =
  // Custom actions derived views
  {
    readonly [Key in keyof T as Key extends DefaultActionKeys
      ? never
      : T[Key] extends {
          componentName: Capitalize<string>;
        }
      ? T[Key]['componentName']
      : never]: T[Key] extends { type: infer Type }
      ? DerivedSubComponents<Type>
      : never;
  } & {
    // Default actions derived views
    readonly [Key in keyof DefaultActionConfigs as DefaultActionConfigs[Key] extends {
      componentName: Capitalize<string>;
    }
      ? DefaultActionConfigs[Key]['componentName']
      : never]: DerivedSubComponents<DefaultActionConfigs[Key]['type']>;
  };

/**
 * Create sub-components interfaces from action types.
 */
export type DerivedSubComponents<T, K extends object = object> = {
  (props: K): React.JSX.Element;
  displayName: string;
  Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
} & (T extends 'SINGLE_ACTION'
  ? SingleTaskActionViewSubComponents
  : T extends 'BATCH_ACTION'
  ? BatchTaskActionViewSubComponents
  : T extends 'LIST_LOCATIONS'
  ? ListLocationsActionViewSubComponents
  : T extends 'LIST_LOCATION_ITEMS'
  ? ListLocationItemsActionViewSubComponents
  : never);

interface DefaultViewSubComponentProps {
  className?: string;
}

interface SingleTaskActionViewSubComponents {
  Title: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Trigger: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Cancel: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Message: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Destination: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Exit: (props: DefaultViewSubComponentProps) => React.JSX.Element;
}

interface BatchTaskActionViewSubComponents {
  Title: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Trigger: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Cancel: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Table: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  StatusDisplay: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Destination: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Exit: (props: DefaultViewSubComponentProps) => React.JSX.Element;
}

interface ListLocationsActionViewSubComponents {
  Title: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Table: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Search: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Refresh: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Paginate: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Message: (props: DefaultViewSubComponentProps) => React.JSX.Element;
}

interface ListLocationItemsActionViewSubComponents
  extends ListLocationsActionViewSubComponents {
  ActionList: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  ActionsMenu: (props: DefaultViewSubComponentProps) => React.JSX.Element;
  Navigate: (props: DefaultViewSubComponentProps) => React.JSX.Element;
}
