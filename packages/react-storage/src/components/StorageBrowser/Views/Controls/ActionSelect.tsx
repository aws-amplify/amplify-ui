import React from 'react';
import {
  IconElementProps,
  StorageBrowserElements,
} from '../../context/elements';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import { CLASS_BASE } from '../constants';

const { Button, Icon, View } = StorageBrowserElements;
const BLOCK_NAME = `${CLASS_BASE}__action-menu`;

const ACTION_VARIANTS = [
  { variant: 'upload-folder' },
  { variant: 'upload-file' },
] as const;

const iconAttributes = {
  'aria-hidden': true,
  className: `${BLOCK_NAME}__icon`,
  width: '24',
  height: '24',
  viewBox: '0 -960 960 960',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
};

const getIconProps = ({
  variant,
  ...props
}: IconElementProps): IconElementProps => {
  let children;
  switch (variant) {
    case 'upload-folder':
      children = (
        <path
          d="M2.5875 19.4125C2.97917 19.8042 3.45 20 4 20H20C20.55 20 21.0208 19.8042 21.4125 19.4125C21.8042 19.0208 22 18.55 22 18V8C22 7.45 21.8042 6.97917 21.4125 6.5875C21.0208 6.19583 20.55 6 20 6H12L10 4H4C3.45 4 2.97917 4.19583 2.5875 4.5875C2.19583 4.97917 2 5.45 2 6V18C2 18.55 2.19583 19.0208 2.5875 19.4125ZM11.175 8H20V18H4V6H9.175L11.175 8ZM11 12.825V17H13V12.825L14.6 14.425L16 13L12 9L8 13L9.425 14.4L11 12.825Z"
          fill="currentColor"
        />
      );
      break;
    case 'upload-file':
      children = (
        <path
          d="M440-200h80v-167l64 64 56-57-160-160-160 160 57 56 63-63v167ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"
          fill="currentColor"
        />
      );
      break;
  }

  return {
    ...iconAttributes,
    ...props,
    children: props.children ?? children,
    variant,
  };
};

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

const ActionItem: ActionItem = ({ action }) => {
  const { displayName } = action;
  <ActionButton>{displayName}</ActionButton>;
};
ActionItem.Button = ActionButton;
ActionItem.Icon = Icon;

const Menu = withBaseElementProps(View, {
  className: `${BLOCK_NAME}__menu`,
  role: 'menu',
});

const ActionsMenu: ActionsMenu = () => (
  <Menu>
    <ActionItem action={{ displayName: 'Upload folder', type: 'FOLDER' }} />
    <ActionItem action={{ displayName: 'Upload file', type: 'FILE' }} />
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
