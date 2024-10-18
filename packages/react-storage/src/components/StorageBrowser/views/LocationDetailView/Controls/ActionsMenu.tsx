import React from 'react';

import { isEmptyObject } from '@aws-amplify/ui';

import { ActionsMenu, ActionItemProps } from '../../../components/ActionsMenu';
import { useControl } from '../../../context/control';
import { LocationActions } from '../../../context/locationActions';
import { LocationItem, Permission } from '../../../context/types';

const getKeyedFragments = (...nodes: React.ReactNode[]): React.ReactNode[] =>
  nodes.map((child, key) => <React.Fragment key={key}>{child}</React.Fragment>);

const getActionsMenuData = ({
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
            typeof disable === 'function' ? disable(items) : (disable ?? false);
          const onClick = () => onSelect(key);

          return [
            ...output,
            { children, disabled, key, onClick, value: displayName },
          ];
        },
        []
      );

export function ActionsMenuControl({
  disabled = false,
}: {
  disabled?: boolean;
}): React.JSX.Element {
  const [{ actions, selected }, handleUpdate] = useControl('LOCATION_ACTIONS');
  const [{ location }] = useControl('NAVIGATE');

  const { permission } = location ?? {};
  const { items } = selected;

  const data = React.useMemo(
    () =>
      getActionsMenuData({
        actions,
        items,
        onSelect: (actionType) => {
          handleUpdate({ type: 'SET_ACTION', actionType });
        },
        permission,
      }),
    [actions, handleUpdate, items, permission]
  );

  return <ActionsMenu data={data} disabled={disabled} />;
}
