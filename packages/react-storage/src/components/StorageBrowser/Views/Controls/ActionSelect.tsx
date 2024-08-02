import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';
import type { LocationItem } from '../../context/actions';
import type { Action } from '../../context/controls/ActionSelect';
import type { IconVariant } from '../../context/elements/IconElement';
import { CLASS_BASE } from '../constants';
import { useControl } from '../../context/controls';

import type { OmitElements } from '../types';

const { Button, Icon: IconElement, View } = StorageBrowserElements;
const BLOCK_NAME = `${CLASS_BASE}__action-menu`;

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

interface ActionItemProps {
  action: Action;
  variant?: IconVariant;
}

type RenderActionItem = (props: ActionItemProps) => React.JSX.Element;

interface ActionItem<T extends StorageBrowserElements = StorageBrowserElements>
  extends RenderActionItem,
    Pick<T, 'Button' | 'Icon'> {
  (props: ActionItemProps): React.JSX.Element;
}

const ActionItem: ActionItem = ({ action, variant }) => {
  const { name, type } = action;
  const [, handleUpdateState] = useControl({ type: 'ACTION_SELECT' });
  const fileUploadRef = React.useRef<HTMLInputElement>(null);

  const requiresFileInput = type === 'UPLOAD_FILES' || type === 'UPLOAD_FOLDER';

  const handleActionClick = () => {
    if (requiresFileInput) {
      if (fileUploadRef?.current) {
        fileUploadRef.current.click();
      }
    } else {
      /* TODO: Case for actions that don't need an input */
      handleUpdateState({
        actionType: type,
        type: 'SELECT_ACTION_TYPE',
        destination: 'public/',
        name: name,
        items: [],
      });
    }
  };

  const handleInputChange = () => {
    if (fileUploadRef.current?.files) {
      const files: FileList = fileUploadRef.current?.files;
      const items: LocationItem[] = [];
      for (const file of files) {
        const { name, lastModified, size } = file;
        items.push({
          key: name,
          lastModified: new Date(lastModified),
          size,
          type: 'FILE',
        });
      }

      handleUpdateState({
        actionType: type,
        type: 'SELECT_ACTION_TYPE',
        destination: 'public/', // TODO: temp hardcode
        items,
        name,
      });
    }
  };

  return (
    <>
      {requiresFileInput ? (
        <input
          ref={fileUploadRef}
          onChange={() => handleInputChange()}
          style={{ display: 'none' }}
          multiple
          type="file"
        />
      ) : null}
      <ActionButton onClick={() => handleActionClick()}>
        <ActionIcon variant={variant} />
        {name}
      </ActionButton>
    </>
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

const TEMP_ACTIONS: ActionItemProps[] = [
  {
    action: {
      name: 'Upload file',
      type: 'UPLOAD_FILES',
    },
    variant: 'upload-file',
  },
  {
    action: {
      name: 'Upload folder',
      type: 'UPLOAD_FOLDER',
    },
    variant: 'upload-folder',
  },
  {
    action: {
      name: 'Create folder',
      type: 'CREATE_FOLDER',
    },
    variant: 'create-folder',
  },
];

const ActionsMenu: ActionsMenu = ({ isOpen }) => {
  const menuClasses = `${BLOCK_NAME}__menu${
    isOpen ? ` ${BLOCK_NAME}__menu--open` : ''
  }`;

  return (
    <Menu className={menuClasses}>
      {TEMP_ACTIONS.map(({ action, variant }) => (
        <ActionItem key={action.type} action={action} variant={variant} />
      ))}
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
