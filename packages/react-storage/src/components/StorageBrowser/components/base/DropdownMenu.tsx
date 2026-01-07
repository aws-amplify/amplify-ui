import React from 'react';

import type { StorageBrowserIconType } from '../elements';
import { ButtonElement, IconElement, ViewElement } from '../elements';

import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from './constants';

interface MenuItem {
  isDisabled?: boolean;
  isHidden?: boolean;
  icon?: StorageBrowserIconType;
  id: string;
  label?: string;
}

interface MenuItemProps extends Omit<MenuItem, 'isHidden' | 'id'> {
  onClick?: () => void;
}

export interface MenuProps {
  isDisabled?: boolean;
  items: MenuItem[];
  onItemSelect?: (id: string) => void;
}

export function MenuItem({
  isDisabled,
  icon,
  label,
  onClick,
}: MenuItemProps): React.JSX.Element {
  return (
    <ButtonElement
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__menu-item`}
      disabled={isDisabled}
      role={'menuitem'}
      onClick={onClick}
      variant="menu-item"
    >
      {icon && (
        <IconElement
          className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__menu-item-icon`}
          variant={icon}
        />
      )}
      {label}
    </ButtonElement>
  );
}

export function DropdownMenu({
  isDisabled = false,
  items,
  onItemSelect,
}: MenuProps): React.JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <ViewElement className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__menu`}>
      <ButtonElement
        aria-label="Menu Toggle"
        className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__menu-toggle`}
        disabled={isDisabled || !items?.length}
        data-testid="MENU_TOGGLE"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        variant="menu-toggle"
      >
        <IconElement
          className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__menu-toggle-icon`}
          variant="vertical-kebab"
        />
      </ButtonElement>
      <ViewElement
        aria-label="Menu Items"
        className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__menu-list${
          isOpen
            ? ` ${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__menu-list--open`
            : ''
        }`}
        data-testid="MENU_LIST"
        role="menu"
        variant="menu-list"
      >
        {items
          .filter(({ isHidden }) => !isHidden)
          .map(({ icon, id, isDisabled, label }) => {
            return (
              <MenuItem
                key={`menu-item-${id}`}
                isDisabled={isDisabled}
                icon={icon}
                label={label}
                onClick={() => {
                  setIsOpen(false);
                  onItemSelect?.(id);
                }}
              />
            );
          })}
      </ViewElement>
    </ViewElement>
  );
}
