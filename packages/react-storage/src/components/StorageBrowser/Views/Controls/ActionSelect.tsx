import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';

const { Button, Icon } = StorageBrowserElements;

const BLOCK_NAME = 'action-menu';

type PermissionType = 'READ' | 'READWRITE' | 'WRITE';

interface FolderData {
  key: string;
  type: 'FOLDER';
}
interface FileData {
  key: string;
  lastModified: Date;
  size: number;
  type: 'FILE';
}
type LocationItem = FileData | FolderData;

interface Action {
  displayName: string;
  hide?: (permissionType: PermissionType) => boolean;
  disable?: (selected: LocationItem[] | undefined) => boolean;
  type: string;
}

type RenderActionItem = (props: { action: Action }) => React.JSX.Element;

interface ActionItem<T extends StorageBrowserElements>
  extends RenderActionItem,
    Pick<T, 'Button' | 'ListItem' | 'Icon'> {}

/* <ActionsList /> */
interface ActionsList<T extends StorageBrowserElements> {
  (props: { renderActionItem?: RenderActionItem }): React.JSX.Element;
  List: T['UnorderedList'];
  ActionItem: ActionItem<T>;
}

/* <Toggle /> */

interface Toggle<T extends StorageBrowserElements = StorageBrowserElements>
  extends Pick<T, 'Button' | 'Icon'> {
  (): React.JSX.Element;
  Button: T['Button'];
  Icon: T['Icon'];
}

const ToggleButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}`,
  'aria-label': 'Actions',
});

const ToggleIcon = withBaseElementProps(Icon, {
  className: `${BLOCK_NAME}`,
  'aria-hidden': true,
  children: (
    <path
      d="M10.8 20.4H13.2V15.39L15.12 17.31L16.8 15.6L12 10.8L7.2 15.6L8.91 17.28L10.8 15.39V20.4ZM4.8 24C4.14 24 3.575 23.765 3.105 23.295C2.635 22.825 2.4 22.26 2.4 21.6V2.4C2.4 1.74 2.635 1.175 3.105 0.705C3.575 0.235 4.14 0 4.8 0H14.4L21.6 7.2V21.6C21.6 22.26 21.365 22.825 20.895 23.295C20.425 23.765 19.86 24 19.2 24H4.8ZM13.2 8.4V2.4H4.8V21.6H19.2V8.4H13.2Z"
      fill="currentColor"
    />
  ),
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
});

const Toggle: Toggle = () => (
  <ToggleButton>
    <ToggleIcon />
  </ToggleButton>
);

Toggle.Button = ToggleButton;
Toggle.Icon = ToggleIcon;

export interface ActionSelectControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Toggle: Toggle<T>;
  ActionsList: ActionsList<T>;
}

export const ActionSelectControl: ActionSelectControl = () => (
  <>
    <Toggle />
    <ActionsList />
  </>
);

ActionSelectControl.Toggle = Toggle;
ActionSelectControl.ActionsList = ActionsList;
