import React from 'react';
import {
  ActionVariant,
  IconElementProps,
  StorageBrowserElements,
} from '../../context/elements';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import { CLASS_BASE } from '../constants';

const { Button, Icon: IconElement, View } = StorageBrowserElements;
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
    case 'upload-file':
      children = (
        <path
          d="M440-200h80v-167l64 64 56-57-160-160-160 160 57 56 63-63v167ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"
          fill="currentColor"
        />
      );
      break;
    case 'upload-folder':
      children = (
        <path
          d="M440-280h80v-168l64 64 56-56-160-160-160 160 56 56 64-64v168ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z"
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

const ActionIcon: ActionItem['Icon'] = React.forwardRef(function Icon(
  { variant, ...props },
  ref
) {
  return (
    <IconElement
      {...getIconProps({
        ...props,
        ref,
        variant,
      })}
    />
  );
});

const ActionButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__toggle`,
  role: 'menuitem',
});

interface ActionItem<T extends StorageBrowserElements = StorageBrowserElements>
  extends RenderActionItem,
    Pick<T, 'Button' | 'Icon'> {}

type RenderActionItem = (props: {
  action: Action;
  variant: ActionVariant;
}) => React.JSX.Element;

const ActionItem: ActionItem = ({ action, variant }) => {
  const { displayName } = action;
  return (
    <ActionButton>
      <ActionIcon variant={variant} />
      {displayName}
    </ActionButton>
  );
};

ActionItem.Button = ActionButton;
ActionItem.Icon = ActionIcon;

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
    <ActionItem
      action={{ displayName: 'Upload folder', type: 'FOLDER' }}
      variant="upload-folder"
    />
    <ActionItem
      action={{ displayName: 'Upload file', type: 'FILE' }}
      variant="upload-file"
    />
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

const ToggleIcon = withBaseElementProps(IconElement, {
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
