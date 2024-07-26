import React from 'react';
import { StorageBrowserElements } from '../../context/elements';
import type { IconVariant } from '../../context/elements/IconElement';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import { CLASS_BASE } from '../constants';

import type { OmitElements } from '../types';
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

type RenderActionItem = (props: {
  action: Action;
  variant?: IconVariant;
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

interface ActionsMenu<T extends StorageBrowserElements = StorageBrowserElements>
  extends RenderActionsMenu {
  Menu: T['View'];
  ActionItem: ActionItem<T>;
}

interface MenuProps {
  isOpen?: boolean;
}

type RenderActionsMenu = (props: MenuProps) => React.JSX.Element;

const Menu = withBaseElementProps(View, {
  role: 'menu',
  'aria-label': 'Actions',
});

const ActionsMenu: ActionsMenu = ({ isOpen }) => {
  const menuClasses = `${BLOCK_NAME}__menu${
    isOpen ? ` ${BLOCK_NAME}__menu--open` : ''
  }`;

  return (
    <Menu className={menuClasses}>
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
};
ActionsMenu.ActionItem = ActionItem;
ActionsMenu.Menu = Menu;

/* <Toggle /> */

const ToggleButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__toggle`,
  'aria-label': 'Actions',
});

const ToggleIcon = withBaseElementProps(IconElement, {
  className: `${BLOCK_NAME}__toggle__icon`,
  variant: 'vertical-kebab',
});

/* <ActionSelectControl /> */

const Container = withBaseElementProps(View, {
  className: `${BLOCK_NAME}`,
});

export interface _ActionSelectControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Container: T['View'];

  ActionsMenu: ActionsMenu<T>;
  ToggleButton: T['Button'];
  ToggleIcon: T['Icon'];
}

export interface ActionSelectControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<
    _ActionSelectControl<T>,
    'Container' | 'ActionsMenu' | 'ToggleButton' | 'ToggleIcon'
  > {
  (): React.JSX.Element;
}

export const ActionSelectControl: ActionSelectControl = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <Container>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        <ToggleIcon />
      </ToggleButton>
      <ActionsMenu isOpen={isOpen} />
    </Container>
  );
};
