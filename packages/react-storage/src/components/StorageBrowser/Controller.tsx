import React from 'react';

import { useControl } from './context/controls';

/**
 * Defines and provides default `StorageBrowser`
 * loading behavior
 */
export function Controller(): null {
  const [{ history }] = useControl({
    type: 'NAVIGATE',
  });

  const currentPosition = history.length;
  const hasHistory = !!currentPosition;

  React.useEffect(() => {
    if (!hasHistory) return;
  }, [hasHistory]);

  return null;
}
