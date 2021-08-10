import { BadgeProps } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { BadgePropControlsProps } from './BadgePropControls';

interface UseBadgeProps {
  (initialValues: BadgeProps): BadgePropControlsProps;
}

export const useBadgeProps: UseBadgeProps = (initialValues) => {
  const [size, setSize] = useState<BadgeProps['size']>(initialValues.size);
  const [variation, setVariation] = useState<BadgeProps['variation']>(
    initialValues.variation
  );

  return {
    size,
    setSize,
    variation,
    setVariation,
  };
};
