import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';

import { ICON_ATTRIBUTES } from './constants';

const { Button, View, Icon } = StorageBrowserElements;

const BLOCK_NAME = 'action-menu';
const ACTION_MENU_NAME = 'Action menu';
const ACTION_MENU_ICON_ATTRIBUTES = {
  className: `${BLOCK_NAME}__icon`,
  'aria-hidden': true,
};

/* Icons */

const uploadFileIconProps = () => ({
  children: (
    <path
      d="M10.8 20.4H13.2V15.39L15.12 17.31L16.8 15.6L12 10.8L7.2 15.6L8.91 17.28L10.8 15.39V20.4ZM4.8 24C4.14 24 3.575 23.765 3.105 23.295C2.635 22.825 2.4 22.26 2.4 21.6V2.4C2.4 1.74 2.635 1.175 3.105 0.705C3.575 0.235 4.14 0 4.8 0H14.4L21.6 7.2V21.6C21.6 22.26 21.365 22.825 20.895 23.295C20.425 23.765 19.86 24 19.2 24H4.8ZM13.2 8.4V2.4H4.8V21.6H19.2V8.4H13.2Z"
      fill="currentColor"
    />
  ),
  ...ICON_ATTRIBUTES,
  ...ACTION_MENU_ICON_ATTRIBUTES,
});

const uploadFolderIconProps = () => ({
  children: (
    <path
      d="M10.8 18H13.2V12.96L15.12 14.88L16.8 13.2L12 8.4L7.2 13.2L8.88 14.88L10.8 12.96V18ZM2.4 21.6C1.74 21.6 1.175 21.365 0.705 20.895C0.235 20.425 0 19.86 0 19.2V4.8C0 4.14 0.235 3.575 0.705 3.105C1.175 2.635 1.74 2.4 2.4 2.4H9.6L12 4.8H21.6C22.26 4.8 22.825 5.035 23.295 5.505C23.765 5.975 24 6.54 24 7.2V19.2C24 19.86 23.765 20.425 23.295 20.895C22.825 21.365 22.26 21.6 21.6 21.6H2.4ZM2.4 19.2H21.6V7.2H11.01L8.61 4.8H2.4V19.2Z"
      fill="currentColor"
    />
  ),
  ...ICON_ATTRIBUTES,
  ...ACTION_MENU_ICON_ATTRIBUTES,
});

const toggleIconProps = () => ({
  children: (
    <>
      <circle cx="12" cy="3" r="3" fill="currentColor" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <circle cx="12" cy="21" r="3" fill="currentColor" />
    </>
  ),
  ...ICON_ATTRIBUTES,
  ...ACTION_MENU_ICON_ATTRIBUTES,
});

const ToggleIcon = withBaseElementProps(Icon, toggleIconProps);
const UploadFileIcon = withBaseElementProps(Icon, uploadFileIconProps);
const UploadFolderIcon = withBaseElementProps(Icon, uploadFolderIconProps);

/* Toggle */

const Toggle = withBaseElementProps(Button, {
  'aria-label': ACTION_MENU_NAME,
  'aria-haspopup': 'menu',
  'aria-expanded': false,
  className: `${BLOCK_NAME}__toggle`,
});

const ActionButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__menu__item`,
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
  className: `${BLOCK_NAME}__menu`,
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
  className: `${BLOCK_NAME}`,
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
