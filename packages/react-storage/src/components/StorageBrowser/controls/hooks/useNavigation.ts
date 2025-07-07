/* eslint-disable no-console */
import React from 'react';
import type { NavigationProps } from '../../components/composables/Navigation';
import { useControlsContext } from '../context';
import { getNavigationItems } from './getNavigationItems';
import { getNavigationParts } from './getNavigationParts';
import { LocationData } from '../../actions';

export const useNavigation = (): NavigationProps & { onBack: () => void } => {
  const { data, onNavigate, onNavigateHome } = useControlsContext();
  const { location } = data;

  console.log('[preview] calling useNavigation location', location);

  const onBack = React.useCallback(() => {
    console.log('calling onBack');
    if (!location?.current || !location.path) {
      // If no current location or already at root, go home
      console.log(
        'calling onBack no current location or already at root, go home'
      );
      onNavigateHome?.();
      return;
    }

    const { current, path } = location;

    // Split the path and remove the last segment to go back one level
    const pathSegments = path
      .split('/')
      .filter((segment) => segment.length > 0);

    if (pathSegments.length === 0) {
      // Already at root level, go home
      onNavigateHome?.();
      return;
    }

    // Remove the last segment to go back one level
    pathSegments.pop();
    const parentPath = pathSegments.join('/');

    // Create a new LocationData object for the parent location
    // Keep the same bucket, id, permissions, and type, but update the prefix
    const parentLocation: LocationData = {
      ...current,
      type: 'PREFIX',
      prefix: current.prefix + (parentPath ? `${parentPath}/` : ''),
    };

    // Navigate to parent location
    console.log('calling onNavigate', { parentLocation, parentPath });

    onNavigate?.(parentLocation, parentPath);
  }, [location, onNavigate, onNavigateHome]);

  return React.useMemo(() => {
    if (!location?.current) {
      return { items: [], onBack };
    }

    const { current, path } = location;

    const destinationParts = getNavigationParts({
      location: current,
      path,
      includeBucketInPrefix: true,
    });

    console.log(
      '[preview] calling useNavigation destinationParts',
      destinationParts
    );

    const homeItem: NavigationProps['items'] = [
      { name: 'Home', onNavigate: onNavigateHome },
    ];

    return {
      items: homeItem.concat(
        getNavigationItems({ location: current, destinationParts, onNavigate })
      ),
      onBack,
    };
  }, [location, onNavigate, onNavigateHome, onBack]);
};
