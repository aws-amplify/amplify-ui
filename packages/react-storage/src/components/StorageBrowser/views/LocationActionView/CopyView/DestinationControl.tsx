import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';

import { Breadcrumb } from '../../../components/BreadcrumbNavigation';
import { DescriptionList } from '../../../components/DescriptionList';

export interface DestinationProps {
  bucket?: string;
  label?: string;
  isDisabled?: boolean;
  destinationList?: string[];
  onDestinationChange?: (destination: string[]) => void;
}

const defaultValue: DestinationProps = {};
export const { useDestination, DestinationProvider } = createContextUtilities({
  contextName: 'Destination',
  defaultValue,
});

/**
 * Temporary `Destination` for `CopyView` only
 */
export function DestinationControl(): React.JSX.Element {
  const { bucket, destinationList, isDisabled, label, onDestinationChange } =
    useDestination();

  const handleNavigatePath = (index: number) => {
    const newPath = destinationList?.slice(0, index + 1);
    if (!newPath) return;

    onDestinationChange?.(newPath);
  };

  return (
    <DescriptionList
      descriptions={[
        {
          term: label,
          details: destinationList?.length ? (
            <>
              {destinationList.map((key, index) => (
                <Breadcrumb
                  isCurrent={index === destinationList.length - 1}
                  key={`${key}-${index}`}
                  onNavigate={
                    isDisabled ? undefined : () => handleNavigatePath(index)
                  }
                  // If bucket level access, show bucket name as root breadcrumb
                  name={key === '' ? bucket : key.replace('/', '')}
                />
              ))}
            </>
          ) : (
            '-'
          ),
        },
      ]}
    />
  );
}
