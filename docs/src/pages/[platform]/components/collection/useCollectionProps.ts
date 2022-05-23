import * as React from 'react';
import { Collection } from '@aws-amplify/ui-react';
import { demoState } from '@/utils/demoState';

export const useCollectionProps = (defaultValues) => {
  const [direction, setDirection] = React.useState(defaultValues.direction);
  const [gap, setGap] = React.useState(defaultValues.gap);
  const [wrap, setWrap] = React.useState(defaultValues.wrap);

  React.useEffect(() => {
    demoState.set(Collection.displayName, {
      direction,
      gap,
      wrap,
    });
  }, [direction, gap, wrap]);

  return {
    direction,
    setDirection,
    gap,
    setGap,
    wrap,
    setWrap,
  };
};
