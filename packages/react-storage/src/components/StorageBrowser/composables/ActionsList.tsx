import React from 'react';

import { DropdownMenu } from '../components/DropdownMenu';
import { StorageBrowserIconType } from '../context/elements';

export interface ActionListItem {
  isDisabled?: boolean;
  isHidden?: boolean;
  icon?: StorageBrowserIconType;
  actionType: string;
  label?: string;
}

export interface ActionsListProps {
  isDisabled?: boolean;
  items: ActionListItem[];
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
