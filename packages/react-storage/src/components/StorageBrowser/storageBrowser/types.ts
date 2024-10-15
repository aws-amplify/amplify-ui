import {
  ActionConfigs,
  DefaultActionConfigs,
  DefaultActionKeys,
} from '../actions/configs';
import { createUseAction } from '../actions/createUseAction';
import { StorageBrowserElements } from '../context/elements';
import { Config } from '../createProvider';

interface CreateStorageBrowserInput<
  DefinedActionConfigs extends ActionConfigs,
> {
  config: Config;
  elements?: Partial<StorageBrowserElements>;
  actions?: DefinedActionConfigs;
}

interface CreateStorageBrowserOutput<
  DefinedActionConfigs extends ActionConfigs,
> {
  StorageBrowser: {
    (props: {
      type: ExtractComponentNamesFromActionConfigs<DefinedActionConfigs>;
    }): React.JSX.Element;
    displayName: string;
    Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
  } & CreateActionDerivedViews<DefinedActionConfigs>; // & the action derived views components
  useAction: ReturnType<
    typeof createUseAction<DefaultActionConfigs & DefinedActionConfigs>
  >;
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
type ExtractComponentNamesFromActionConfigs<CustomActionConfigs> = keyof ({
  [Key in keyof DefaultActionConfigs as DefaultActionConfigs[Key] extends {
    componentName: Capitalize<string>;
  }
    ? DefaultActionConfigs[Key]['componentName']
    : never]: undefined;
} & {
  [Key in keyof CustomActionConfigs as Key extends DefaultActionKeys
    ? never
    : CustomActionConfigs[Key] extends {
        componentName: Capitalize<string>;
      }
    ? CustomActionConfigs[Key]['componentName']
    : never]: undefined;
});

/**
 * Create derived views from both custom actions and default actions.
 *
 * One can override default actions, but the view interface of the default actions
 * remain the same.
 */
type CreateActionDerivedViews<DefinedActionConfigs> =
  // Custom actions derived views
  {
    readonly [Key in keyof DefinedActionConfigs as Key extends DefaultActionKeys
      ? never
      : DefinedActionConfigs[Key] extends {
          componentName: Capitalize<string>;
        }
      ? DefinedActionConfigs[Key]['componentName']
      : never]: DefinedActionConfigs[Key] extends { type: infer Type }
      ? CreateSubComponentsFromActionTypes<Type>
      : never;
  } & {
    // Default actions derived views
    readonly [Key in keyof DefaultActionConfigs as DefaultActionConfigs[Key] extends {
      componentName: Capitalize<string>;
    }
      ? DefaultActionConfigs[Key]['componentName']
      : never]: CreateSubComponentsFromActionTypes<
      DefaultActionConfigs[Key]['type']
    >;
  };

/**
 * Create sub-components interfaces from action types.
 */
export type CreateSubComponentsFromActionTypes<
  ActionType,
  Props extends object = object,
> = {
  (props: Props): React.JSX.Element;
  displayName: string;
  Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
} & (ActionType extends 'SINGLE_ACTION'
  ? SingleTaskActionViewSubComponents
  : ActionType extends 'BATCH_ACTION'
  ? BatchTaskActionViewSubComponents
  : ActionType extends 'LIST_LOCATIONS'
  ? ListLocationsActionViewSubComponents
  : ActionType extends 'LIST_LOCATION_ITEMS'
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
