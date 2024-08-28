import React from 'react';

import { useAction, useLocationsData } from './context/actions';
import { useControl } from './context/controls';

/**
 * Defines and provides default `StorageBrowser`
 * loading behavior
 */
export function Controller(): null {
  const [, handleListLocations] = useLocationsData();

  React.useEffect(() => {
    handleListLocations({
      options: { pageSize: 1000, refresh: true, exclude: 'WRITE' },
    });
  }, [handleListLocations]);

  const [{ selected }] = useControl({ type: 'ACTION_SELECT' });
  const [{ history, path }] = useControl({
    type: 'NAVIGATE',
  });
  const [, handleListLocationItems] = useAction({
    type: 'LIST_LOCATION_ITEMS',
  });

  const currentPosition = history.length;
  const hasHistory = !!currentPosition;

  React.useEffect(() => {
    if (!hasHistory) return;

    // Check to make sure that we're not in an action view
    // This makes it so that the list locations refreshes when we go back from an action view
    if (!selected.type) {
      handleListLocationItems({
        prefix: path,
        options: { pageSize: 1000, refresh: true, delimiter: '/' },
      });
    }
  }, [handleListLocationItems, hasHistory, history, path, selected.type]);

  return null;
}
