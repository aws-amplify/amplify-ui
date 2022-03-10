import { BadgeProps } from '@aws-amplify/ui-react';
import * as React from 'react';

import { BadgePropControlsProps } from './BadgePropControls';

interface UseBadgeProps {
  (initialValues: BadgeProps): BadgePropControlsProps;
}

export const useBadgeProps: UseBadgeProps = (initialValues) => {
  const [variation, setVariation] = React.useState<BadgeProps['variation']>(
    initialValues.variation
  );
  const [size, setSize] = React.useState<BadgeProps['size']>(
    initialValues.size
  );
  const [body, setBody] = React.useState<string>(initialValues.body);

  return {
    variation,
    setVariation,
    size,
    setSize,
    body,
    setBody,
  };
};
