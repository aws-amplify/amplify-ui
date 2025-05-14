import React from 'react';
import type { NavigationProps } from '../../components/composables/Navigation';
import { useControlsContext } from '../context';
import { getNavigationItems } from './getNavigationItems';
import { getNavigationParts } from './getNavigationParts';

export const useNavigation = (): NavigationProps => {
  const { data, onNavigate, onNavigateHome } = useControlsContext();
  const { location } = data;

  return React.useMemo(() => {
    if (!location?.current) {
      return { items: [] };
    }

    const { current, path } = location;

    const destinationParts = getNavigationParts({
      location: current,
      path,
      includeBucketInPrefix: true,
    });

    const homeItem: NavigationProps['items'] = [
      { name: 'Home', onNavigate: onNavigateHome },
    ];

    return {
      items: homeItem.concat(
        getNavigationItems({ location: current, destinationParts, onNavigate })
      ),
    };
  }, [location, onNavigate, onNavigateHome]);
};
