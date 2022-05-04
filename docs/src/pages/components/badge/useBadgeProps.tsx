import { Badge, BadgeProps } from '@aws-amplify/ui-react';
import * as React from 'react';
import { demoState } from '@/utils/demoState';
import { BadgePropControlsProps } from './BadgePropControls';

interface UseBadgeProps {
  (initialValues: BadgeProps & { body?: string }): BadgePropControlsProps;
}

export const useBadgeProps: UseBadgeProps = (initialValues) => {
  const [variation, setVariation] = React.useState<BadgeProps['variation']>(
    initialValues.variation
  );
  const [size, setSize] = React.useState<BadgeProps['size']>(
    initialValues.size
  );
  const [body, setBody] = React.useState<string>(initialValues.body);

  React.useEffect(() => {
    demoState.set(Badge.displayName, {
      variation,
      size,
      body,
    });
  }, [variation, size, body]);

  return React.useMemo(
    () => ({
      variation,
      setVariation,
      size,
      setSize,
      body,
      setBody,
    }),
    [variation, setVariation, size, setSize, body, setBody]
  );
};
