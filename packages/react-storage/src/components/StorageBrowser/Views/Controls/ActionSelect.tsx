import React from 'react';
import { StorageBrowserElements } from '../../context/elements';
import type { IconVariant } from '../../context/elements/IconElement';
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

const ActionIcon: typeof IconElement = React.forwardRef(
  function ActionIcon(props, ref) {
    const { variant } = props;

    return variant ? (
      <IconElement
        {...props}
        className={props.className ?? `${BLOCK_NAME}__icon`}
        variant={variant}
        ref={ref}
      />
    ) : null;
  }
);

const ActionButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__action-button`,
  role: 'menuitem',
});

interface ActionItem<T extends StorageBrowserElements = StorageBrowserElements>
  extends RenderActionItem,
    Pick<T, 'Button' | 'Icon'> {}

type RenderActionItem = (props: { action: Action }) => React.JSX.Element;

const ActionItem: ActionItem = ({ action }) => {
  const { displayName, type } = action;
  let variant: IconVariant;
  switch (type) {
    case 'FOLDER':
      variant = 'upload-folder';
      break;
    case 'FILE':
      variant = 'upload-file';
      break;
  }

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
  className: `${BLOCK_NAME}__menu`, // ${BLOCK_NAME}__menu--open
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

const ToggleIcon = withBaseElementProps(IconElement, {
  className: `${BLOCK_NAME}__toggle__icon`,
  variant: 'vertical-kebab',
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
