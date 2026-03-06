import type { LocationData } from '../../actions';
import type { NavigationProps } from '../../components/composables/Navigation';

interface GetNavigationItemsInput {
  destinationParts: string[];
  location: LocationData;
  onNavigate?: (location: LocationData, path?: string) => void;
}

export const getNavigationItems = ({
  destinationParts,
  location,
  onNavigate,
}: GetNavigationItemsInput): NavigationProps['items'] => {
  const { bucket, permissions, prefix = '', type } = location;
  const destinationSubpaths: string[] = [];

  return destinationParts.map((part, index) => {
    const isCurrent = index === destinationParts.length - 1;

    if (index !== 0) {
      destinationSubpaths.push(part);
    }

    const destinationPath = `${destinationSubpaths.concat('').join('/')}`;

    const destination = {
      id: crypto.randomUUID(),
      type,
      permissions,
      bucket,
      prefix,
    };

    return {
      name: part,
      ...(isCurrent && { isCurrent }),
      onNavigate: () => {
        onNavigate?.(destination, destinationPath);
      },
    };
  });
};
