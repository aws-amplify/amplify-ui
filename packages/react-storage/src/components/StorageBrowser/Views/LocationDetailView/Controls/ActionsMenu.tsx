import React from 'react';

import { isEmptyObject } from '@aws-amplify/ui';

import { ActionsMenu, ActionItemProps } from '../../../components/ActionsMenu';

import { CLASS_BASE } from '../../constants';
import { useControl } from '../../../context/controls';

import { LocationActions } from '../../../context/controls/locationActions';

import { LocationItem, Permission } from '../../../context/types';

const BLOCK_NAME = `${CLASS_BASE}__actions-menu`;
const BUTTON_CLASS_NAME = `${BLOCK_NAME}__action-button`;

const getMenuData = ({
  actions,
  items = [],
  onSelect,
  permission,
}: {
  actions: LocationActions;
  items: LocationItem[] | undefined;
  onSelect: (type: string) => void;
  permission: Permission | undefined;
}): ActionItemProps[] =>
  !permission || isEmptyObject(actions)
    ? []
    : Object.entries(actions).reduce(
        (output: ActionItemProps[], [key, { options }]) => {
          const { icon, hide, disable, displayName } = options ?? {};

          if (typeof hide === 'function' ? hide(permission) : hide) {
            return output;
          }

          return [
            ...output,
            {
              children: [icon, displayName],
              className: BUTTON_CLASS_NAME,
              disabled:
                typeof disable === 'function'
                  ? disable(items)
                  : disable ?? false,
              key,
              onClick: () => {
                onSelect(key);
              },
            },
          ];
        },
        []
      );

export const ActionsMenuControl = (): React.JSX.Element => {
  const [{ actions, selected }, handleUpdate] = useControl({
    type: 'ACTION_SELECT',
  });

  const [{ location }] = useControl({ type: 'NAVIGATE' });

  const { permission } = location ?? {};
  const { items } = selected;

  const data = React.useMemo(
    () =>
      getMenuData({
        actions,
        items,
        onSelect: (payload) => {
          handleUpdate({ type: 'SET_ACTION', payload });
        },
        permission,
      }),
    [actions, handleUpdate, items, permission]
  );

  return <ActionsMenu data={data} />;
};
