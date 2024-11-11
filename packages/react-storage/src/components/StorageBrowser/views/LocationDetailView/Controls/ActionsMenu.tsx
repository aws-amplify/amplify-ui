import React from 'react';

import { isEmptyObject } from '@aws-amplify/ui';

import { LocationItemData } from '../../../actions';
import { LocationActions } from '../../../do-not-import-from-here/locationActions';
import { useTempActions } from '../../../do-not-import-from-here/createTempActionsProvider';
import { useStore } from '../../../providers/store';

import { ActionsMenu, ActionItemProps } from '../../../components/ActionsMenu';
import { LocationPermissions } from '../../../credentials/types';
import { toAccessGrantPermission } from '../../../adapters/permissionParsers';

const getKeyedFragments = (...nodes: React.ReactNode[]): React.ReactNode[] =>
  nodes.map((child, key) => <React.Fragment key={key}>{child}</React.Fragment>);

const getActionsMenuData = ({
  actions,
  items = [],
  onSelect,
  permissions,
}: {
  actions: LocationActions;
  items: LocationItemData[] | undefined;
  onSelect: (type: string) => void;
  permissions: LocationPermissions | undefined;
}): ActionItemProps[] =>
  !permissions || isEmptyObject(actions)
    ? []
    : Object.entries(actions).reduce(
        (output: ActionItemProps[], [key, { options }]) => {
          const { icon, hide, disable, displayName } = options ?? {};

          if (
            typeof hide === 'function'
              ? // FIXME: temporarily map the granular permissions type legacy type
                hide(toAccessGrantPermission(permissions))
              : hide
          ) {
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
  const { permissions } = current ?? {};

  const data = React.useMemo(
    () =>
      getActionsMenuData({
        actions,
        items: fileDataItems,
        onSelect: (actionType) => {
          onActionSelect?.(actionType);
          dispatchStoreAction({ type: 'SET_ACTION_TYPE', actionType });
        },
        permissions,
      }),
    [actions, dispatchStoreAction, fileDataItems, onActionSelect, permissions]
  );

  return <ActionsMenu data={data} disabled={disabled} />;
}
