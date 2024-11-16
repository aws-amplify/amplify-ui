import React from 'react';

import { DropdownMenu } from '../components/DropdownMenu';
import { IconVariant } from '../context/elements';

export interface ActionsListItem {
  isDisabled?: boolean;
  isHidden?: boolean;
  icon?: IconVariant;
  actionType: string;
  label?: string;
}

export interface ActionsListProps {
  isDisabled?: boolean;
  items: ActionsListItem[];
  onActionSelect?: (id: string) => void;
}

export const ActionsList = ({
  isDisabled,
  items,
  onActionSelect,
}: ActionsListProps): React.JSX.Element => {
  return (
    <DropdownMenu
      isDisabled={isDisabled}
      items={items.map((item) => ({ ...item, id: item.actionType }))}
      onItemSelect={onActionSelect}
    />
  );
};
