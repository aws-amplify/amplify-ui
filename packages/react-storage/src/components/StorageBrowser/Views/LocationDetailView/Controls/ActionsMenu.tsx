import React from 'react';

import { isEmptyObject } from '@aws-amplify/ui';

import { ActionsMenu, ActionItemProps } from '../../../components/ActionsMenu';
import { useControl } from '../../../context/controls';
import { LocationActions } from '../../../context/controls/locationActions';
import { LocationItem, Permission } from '../../../context/types';

const getKeyedFragments = (...nodes: React.ReactNode[]): React.ReactNode[] =>
  nodes.map((child, key) => <React.Fragment key={key}>{child}</React.Fragment>);

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
          const children = getKeyedFragments(icon, displayName);
          const disabled =
            typeof disable === 'function' ? disable(items) : disable ?? false;
          const onClick = () => onSelect(key);

          return [...output, { children, disabled, key, onClick }];
        },
        []
      );

export function ActionsMenuControl(): React.JSX.Element {
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
}
