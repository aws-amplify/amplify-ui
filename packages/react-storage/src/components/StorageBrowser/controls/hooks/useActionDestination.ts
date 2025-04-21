import React from 'react';

import { useControlsContext } from '../context';
import { getNavigationItems } from './getNavigationItems';
import { getNavigationParts } from './getNavigationParts';
import type { ActionDestinationProps } from '../../components/composables/ActionDestination';

export const useActionDestination = (): ActionDestinationProps => {
  const { data, onSelectDestination } = useControlsContext();
  const { actionDestinationLabel, isActionDestinationNavigable, destination } =
    data;

  return React.useMemo(() => {
    if (!destination?.current) {
      return { items: [] };
    }

    const { current, path } = destination;

    const destinationParts = getNavigationParts({
      location: current,
      path,
    });

    return {
      label: actionDestinationLabel,
      items: getNavigationItems({
        location: current,
        destinationParts,
        onNavigate: onSelectDestination,
      }),
      isNavigable: isActionDestinationNavigable,
    };
  }, [
    actionDestinationLabel,
    isActionDestinationNavigable,
    destination,
    onSelectDestination,
  ]);
};
