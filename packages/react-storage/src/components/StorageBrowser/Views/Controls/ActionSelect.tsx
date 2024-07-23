import React from 'react';
import { StorageBrowserElements } from '../../context/elements';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import { CLASS_BASE } from '../constants';

const { Button, Icon, View } = StorageBrowserElements;
const BLOCK_NAME = `${CLASS_BASE}__action-menu`;

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

/* <ActionItem /> */

const ActionButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__toggle`,
  role: 'menuitem',
});

interface ActionItem<T extends StorageBrowserElements = StorageBrowserElements>
  extends RenderActionItem,
    Pick<T, 'Button'> {}

type RenderActionItem = (props: { action: Action }) => React.JSX.Element;

const ActionItem: ActionItem = ({ action }) => {
  const { displayName } = action;
  return <ActionButton>{displayName}</ActionButton>;
};

ActionItem.Button = ActionButton;

/* <ActionsMenu /> */
interface ActionsMenu<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (props: { renderActionItem?: RenderActionItem }): React.JSX.Element;
  Menu: T['View'];
  ActionItem: ActionItem<T>;
}

const Menu = withBaseElementProps(View, {
  className: `${BLOCK_NAME}__menu`,
  role: 'menu',
  'aria-label': 'Actions',
});

const ActionsMenu: ActionsMenu = () => (
  <Menu>
    <ActionItem action={{ displayName: 'Upload folder', type: 'FOLDER' }} />
    <ActionItem action={{ displayName: 'Upload file', type: 'FILE' }} />
  </Menu>
);
ActionsMenu.ActionItem = ActionItem;
ActionsMenu.Menu = Menu;

/* <Toggle /> */

interface Toggle<T extends StorageBrowserElements = StorageBrowserElements>
  extends Pick<T, 'Button' | 'Icon'> {
  (): React.JSX.Element;
}

const ToggleButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__toggle`,
  'aria-label': 'Actions',
});

const ToggleIcon = withBaseElementProps(Icon, {
  className: `${BLOCK_NAME}__toggle__icon`,
  'aria-hidden': true,
  children: (
    <path
      d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"
      fill="currentColor"
    />
  ),
  width: '24',
  height: '24',
  viewBox: '0 -960 960 960',
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

/* <ActionSelectControl /> */

const Container = withBaseElementProps(View, {
  className: `${BLOCK_NAME}`,
});
export interface ActionSelectControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Container: T['View'];
  ActionsMenu: ActionsMenu<T>;
  Toggle: Toggle<T>;
}

export const ActionSelectControl: ActionSelectControl = () => (
  <Container>
    <Toggle />
    <ActionsMenu />
  </Container>
);
ActionSelectControl.Container = Container;
ActionSelectControl.ActionsMenu = ActionsMenu;
ActionSelectControl.Toggle = Toggle;
