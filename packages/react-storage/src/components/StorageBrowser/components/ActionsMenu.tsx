import React from 'react';

import {
  ButtonElement,
  ButtonElementProps,
  IconElement,
  ViewElement,
} from '../context/elements';
import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../constants';

import { DataListProps } from './types';
import { isFunction } from '@aws-amplify/ui';

const ACTION_ITEM_VARIANT = 'actions-menu-item';

export interface ActionItemProps extends ButtonElementProps {}

type HandleSelect = (value: ActionItemProps['value']) => void;
export interface ActionsMenuProps extends DataListProps<ActionItemProps> {
  disabled?: boolean;
  onSelect?: HandleSelect;
}

export function ActionItem(
  {
    className = `${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__actions-menu-button`,
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

const getActionsMenuItemProps = ({
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
    <ViewElement
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__actions-menu`}
    >
      <ButtonElement
        aria-label="Actions"
        className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__actions-menu-toggle`}
        disabled={disabled || !data?.length}
        data-testid="ACTIONS_MENU_TOGGLE"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        variant="actions-menu-toggle"
      >
        <IconElement
          className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__actions-menu-toggle-icon`}
          variant="vertical-kebab"
        />
      </ButtonElement>
      <ViewElement
        aria-label="Actions"
        className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__actions-menu-list${
          isOpen
            ? ` ${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__actions-menu-list--open`
            : ''
        }`}
        data-testid="ACTIONS_MENU_LIST"
        role="menu"
        variant="actions-menu-list"
      >
        {getActionsMenuItemProps({ data, onSelect }).map(renderItem)}
      </ViewElement>
    </ViewElement>
  );
}
