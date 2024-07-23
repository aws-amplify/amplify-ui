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

type RenderActionItem = (props: { action: Action }) => React.JSX.Element;

interface ActionItem<T extends StorageBrowserElements = StorageBrowserElements>
  extends RenderActionItem,
    Pick<T, 'Button' | 'Icon'> {}

/* <ActionsMenu /> */
interface ActionsMenu<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (props: { renderActionItem?: RenderActionItem }): React.JSX.Element;
  Menu: T['View'];
  ActionItem: ActionItem<T>;
}

const ActionButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__menu__button`,
});

const ActionItem: ActionItem = () => <ActionButton></ActionButton>;
ActionItem.Button = Button;

ActionItem.Icon = Icon;

const Menu = withBaseElementProps(View, {
  className: `${BLOCK_NAME}__menu`,
  role: 'menu',
});

const ActionsMenu: ActionsMenu = () => (
  <Menu>
    <ActionItem action={{ displayName: 'Upload folder', type: 'type' }} />
    <ActionItem action={{ displayName: 'Upload folder', type: 'type' }} />
  </Menu>
);
ActionsMenu.ActionItem = ActionItem;
ActionsMenu.Menu = Menu;

interface Toggle<T extends StorageBrowserElements = StorageBrowserElements>
  extends Pick<T, 'Button' | 'Icon'> {
  (): React.JSX.Element;
}

export interface ActionSelectControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  ActionsMenu: ActionsMenu<T>;
  Toggle: Toggle<T>;
}

const Toggle: Toggle = () => <>Hi</>;

Toggle.Button = Button;
Toggle.Icon = Icon;

export const ActionSelectControl: ActionSelectControl = () => (
  <>
    <Toggle />
    <ActionsMenu />
  </>
);
ActionSelectControl.ActionsMenu = ActionsMenu;
ActionSelectControl.Toggle = Toggle;
