import React from 'react';

import {
  ButtonElement,
  ButtonElementProps,
  IconElement,
  ViewElement,
} from '../context/elements';
import { CLASS_BASE } from '../views/constants';

import { DataListProps } from './types';
import { isFunction } from '@aws-amplify/ui';

const MENU_BLOCK_NAME = `${CLASS_BASE}__actions-menu`;

const BUTTON_CLASS_NAME = `${MENU_BLOCK_NAME}__action-button`;
const MENU_CLASS_NAME = `${MENU_BLOCK_NAME}__menu`;
const TOGGLE_CLASS_NAME = `${MENU_BLOCK_NAME}__toggle`;

const ACTION_ITEM_VARIANT = 'actions-menu-item';

export interface ActionItemProps extends ButtonElementProps {}

type HandleSelect = (value: ActionItemProps['value']) => void;
export interface ActionsMenuProps extends DataListProps<ActionItemProps> {
  disabled?: boolean;
  onSelect?: HandleSelect;
}

export function ActionItem(
  {
    className = BUTTON_CLASS_NAME,
    key,
    variant = ACTION_ITEM_VARIANT,
    role = 'menuitem',
    ...props
  }: ActionItemProps,
  index: number
): React.JSX.Element {
  return (
    <ButtonElement
      {...props}
      className={className}
      key={key ?? index}
      role={role}
      variant={variant}
    />
  );
}

const getActionMenuItemProps = ({
  data,
  disabled: _disabled = false,
  onSelect,
}: ActionsMenuProps): ActionItemProps[] =>
  !data?.length
    ? []
    : data.map(({ disabled = _disabled, onClick, value, ...item }) => ({
        ...item,
        disabled,
        onClick: (e) => {
          if (isFunction(onClick)) {
            onClick(e);
          }
          if (isFunction(onSelect)) {
            onSelect(value);
          }
        },
        value,
      }));

export function ActionsMenu({
  data,
  disabled = false,
  onSelect: _handleSelect,
  renderItem = ActionItem,
}: ActionsMenuProps): React.JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);

  const onSelect: HandleSelect = (value) => {
    if (isFunction(_handleSelect)) {
      _handleSelect(value);
    }
    setIsOpen(false);
  };

  return (
    <ViewElement className={MENU_BLOCK_NAME}>
      <ButtonElement
        aria-label="Actions"
        className={TOGGLE_CLASS_NAME}
        disabled={disabled || !data?.length}
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
        {getActionMenuItemProps({ data, onSelect }).map(renderItem)}
      </ViewElement>
    </ViewElement>
  );
}
