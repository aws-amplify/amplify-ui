import React from 'react';

import { isEmptyObject } from '@aws-amplify/ui';

import { LocationItemData } from '../../../actions';
import { LocationActions } from '../../../do-not-import-from-here/locationActions';
import { useTempActions } from '../../../do-not-import-from-here/createTempActionsProvider';
import { useStore } from '../../../providers/store';
import { Permission } from '../../../storage-internal';

import { ActionsMenu, ActionItemProps } from '../../../components/ActionsMenu';

const getKeyedFragments = (...nodes: React.ReactNode[]): React.ReactNode[] =>
  nodes.map((child, key) => <React.Fragment key={key}>{child}</React.Fragment>);

const getActionsMenuData = ({
  actions,
  items = [],
  onSelect,
  permission,
}: {
  actions: LocationActions;
  items: LocationItemData[] | undefined;
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

          return [
            ...output,
            { children, disabled, key, onClick, value: displayName },
          ];
        },
        []
      );

export function ActionsMenuControl({
  disabled = false,
  onActionSelect,
}: {
  disabled?: boolean;
  onActionSelect?: (type: string) => void;
}): React.JSX.Element {
  // leave in place until actions API is integrated
  const actions = useTempActions();

  const [{ location, locationItems }, dispatchStoreAction] = useStore();
  const { fileDataItems } = locationItems;
  const { current } = location;
  const { permission } = current ?? {};

  const data = React.useMemo(
    () =>
      getActionsMenuData({
        actions,
        items: fileDataItems,
        onSelect: (actionType) => {
          onActionSelect?.(actionType);
          dispatchStoreAction({ type: 'SET_ACTION_TYPE', actionType });
        },
        permission,
      }),
    [actions, dispatchStoreAction, fileDataItems, onActionSelect, permission]
  );

  return <ActionsMenu data={data} disabled={disabled} />;
}
