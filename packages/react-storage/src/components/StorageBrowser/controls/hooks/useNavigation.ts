import React from 'react';
import { NavigationProps } from '../../composables/Navigation';
import { useControlsContext } from '../../controls/context';

export const useNavigation = (): NavigationProps => {
  const { data, onNavigate, onNavigateHome } = useControlsContext();
  const { location } = data;

  return React.useMemo(() => {
    if (!location?.current) {
      return { items: [] };
    }

    const { current, path } = location;
    const { bucket, permissions, prefix = '', type } = current;

    const trimmedPrefix = prefix.endsWith('/') ? prefix.slice(0, -1) : prefix;
    const trimmedPath = path.endsWith('/') ? path.slice(0, -1) : path;

    const prefixParts =
      type === 'BUCKET'
        ? ['']
        : [`${bucket}${trimmedPrefix && `/${trimmedPrefix}`}`];

    if (type === 'BUCKET' && trimmedPrefix) {
      prefixParts.push(trimmedPrefix);
    }

    const pathParts = trimmedPath ? trimmedPath.split('/') : [];

    const parts = prefixParts.concat(pathParts);
    const destinationParts: string[] = [];
    return {
      items: [{ name: 'Home', onNavigate: onNavigateHome }].concat(
        parts.map((part, index) => {
          const isCurrent = index === parts.length - 1;
          const name = index === 0 && type === 'BUCKET' ? bucket : part;

          if (index !== 0) {
            destinationParts.push(part);
          }

          const destinationPath = `${destinationParts.concat('').join('/')}`;

          const destination = {
            id: crypto.randomUUID(),
            type,
            permissions,
            bucket,
            prefix,
          };

          return {
            name,
            ...(isCurrent && { isCurrent }),
            onNavigate: () => {
              onNavigate?.(destination, destinationPath);
            },
          };
        })
      ),
    };
  }, [location, onNavigate, onNavigateHome]);
};
