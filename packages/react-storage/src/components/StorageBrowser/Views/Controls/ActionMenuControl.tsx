import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';

import { ACTION_MENU_BLOCK_NAME, ACTION_MENU_NAME } from './constants';
import { ToggleIcon, UploadFileIcon, UploadFolderIcon } from './icons';

const { Button, View } = StorageBrowserElements;

const Toggle = withBaseElementProps(Button, {
  'aria-label': ACTION_MENU_NAME,
  'aria-haspopup': 'menu',
  'aria-expanded': false,
  className: `${ACTION_MENU_BLOCK_NAME}__toggle`,
});

const ActionButton = withBaseElementProps(Button, {
  className: `${ACTION_MENU_BLOCK_NAME}__action-button`,
  role: 'menuitem',
});

/** UploadFolderActionControl */

const UploadFolderActionControl: UploadFolderActionControl = () => (
  <ActionButton>
    <UploadFolderIcon /> Upload folder
  </ActionButton>
);

UploadFolderActionControl.Button = ActionButton;
UploadFolderActionControl.Icon = UploadFolderIcon;
interface UploadFolderActionControl<
  T extends Partial<StorageBrowserElements> = StorageBrowserElements,
> {
  (): JSX.Element;
  Button: T['Button'];
  Icon: T['Icon'];
}

/** UploadFileActionControl */

const UploadFileActionControl: UploadFileActionControl = () => (
  <ActionButton>
    <UploadFileIcon /> Upload file
  </ActionButton>
);

UploadFileActionControl.Button = ActionButton;
UploadFileActionControl.Icon = UploadFileIcon;
interface UploadFileActionControl<
  T extends Partial<StorageBrowserElements> = StorageBrowserElements,
> {
  (): JSX.Element;
  Button: T['Button'];
  Icon: T['Icon'];
}

/** MenuControl */

const MenuContainer = withBaseElementProps(View, {
  'aria-label': ACTION_MENU_NAME,
  'tab-index': -1,
  className: `${ACTION_MENU_BLOCK_NAME}__menu`,
  role: 'menu',
});

const MenuControl: MenuControl = () => (
  <MenuContainer>
    <UploadFileActionControl />
    <UploadFolderActionControl />
  </MenuContainer>
);

MenuControl.Container = MenuContainer;
MenuControl.UploadFile = UploadFileActionControl;
MenuControl.UploadFolder = UploadFolderActionControl;
MenuControl.UploadFileIcon = UploadFileIcon;
MenuControl.UploadFolderIcon = UploadFolderIcon;
interface MenuControl<
  T extends Partial<StorageBrowserElements> = StorageBrowserElements,
> {
  (): JSX.Element;
  Container: T['View'];
  UploadFile: UploadFileActionControl<T>;
  UploadFolder: UploadFolderActionControl<T>;
  UploadFileIcon: T['Icon'];
  UploadFolderIcon: T['Icon'];
}

/** ActionMenuControl */

const Container = withBaseElementProps(View, {
  className: `${ACTION_MENU_BLOCK_NAME}`,
});

export const ActionMenuControl: ActionMenuControl = () => (
  <Container>
    <Toggle>
      <ToggleIcon />
    </Toggle>
    <MenuControl />
  </Container>
);

ActionMenuControl.Container = Container;
ActionMenuControl.Toggle = Toggle;
ActionMenuControl.ToggleIcon = ToggleIcon;
ActionMenuControl.Menu = MenuControl;

export interface ActionMenuControl<
  T extends Partial<StorageBrowserElements> = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Container: T['View'];
  Toggle: T['Button'];
  ToggleIcon: T['Icon'];
  Menu: MenuControl<T>;
}
