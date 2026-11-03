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
  const { prefix = '' } = location;
  const destinationSubpaths: string[] = [];

  return destinationParts.map((part, index) => {
    const isCurrent = index === destinationParts.length - 1;

    if (index !== 0) {
      destinationSubpaths.push(part);
    }

    const destinationPath = `${destinationSubpaths.concat('').join('/')}`;

    // spread `location` so every field (e.g. the owner `accountId`) is kept
    const destination = { ...location, id: crypto.randomUUID(), prefix };

    return {
      name: part,
      ...(isCurrent && { isCurrent }),
      onNavigate: () => {
        onNavigate?.(destination, destinationPath);
      },
    };
  });
};
