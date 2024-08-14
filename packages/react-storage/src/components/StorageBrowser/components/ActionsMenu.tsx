import React from 'react';

import {
  ButtonElement,
  ButtonElementProps,
  IconElement,
  ViewElement,
} from '../context/elements';
import { CLASS_BASE } from '../Views/constants';

import { DataListProps } from './types';

const MENU_BLOCK_NAME = `${CLASS_BASE}__actions-menu`;

const BUTTON_CLASS_NAME = `${MENU_BLOCK_NAME}__action-button`;
const MENU_CLASS_NAME = `${MENU_BLOCK_NAME}__menu`;
const TOGGLE_CLASS_NAME = `${MENU_BLOCK_NAME}__toggle`;

const ACTION_ITEM_VARIANT = 'actions-menu-item';

export interface ActionItemProps extends ButtonElementProps {}

export interface ActionsMenuProps extends DataListProps<ActionItemProps> {}

export function ActionItem({
  className = BUTTON_CLASS_NAME,
  variant = ACTION_ITEM_VARIANT,
  role = 'menuitem',
  ...props
}: ActionItemProps): React.JSX.Element {
  return (
    <ButtonElement
      {...props}
      className={className}
      role={role}
      variant={variant}
    />
  );
}

export function ActionsMenu({
  data,
  renderItem = ActionItem,
}: ActionsMenuProps): React.JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <ViewElement className={MENU_BLOCK_NAME}>
      <ButtonElement
        aria-label="Actions"
        className={TOGGLE_CLASS_NAME}
        data-testid="ACTIONS_MENU_TOGGLE"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        variant="actions-menu-toggle"
      >
        <IconElement
          className={`${TOGGLE_CLASS_NAME}__icon`}
          variant="vertical-kebab"
        />
      </ButtonElement>
      <ViewElement
        aria-label="Actions"
        className={`${MENU_CLASS_NAME}${
          isOpen ? ` ${MENU_CLASS_NAME}--open` : ''
        }`}
        data-testid="ACTIONS_MENU_LIST"
        role="menu"
        variant="actions-menu-list"
      >
        {data?.map(renderItem)}
      </ViewElement>
    </ViewElement>
  );
}
