import { Divider, DividerOptions } from '@aws-amplify/ui-react';
import * as React from 'react';

import { DividerPropControlsProps } from './DividerPropControls';
import { demoState } from '@/utils/demoState';

interface UseDividerProps {
  (initialValues: DividerOptions): DividerPropControlsProps;
}

export const useDividerProps: UseDividerProps = (initialValues) => {
  const [size, setSize] = React.useState<DividerOptions['size']>(
    initialValues.size
  );
  const [orientation, setOrientation] = React.useState<
    DividerOptions['orientation']
  >(initialValues.orientation);
  const [label, setLabel] = React.useState<DividerOptions['label']>(
    initialValues.label
  );

  React.useEffect(() => {
    demoState.set(Divider.displayName, {
      size,
      orientation,
      label,
    });
  }, [size, orientation, label]);

  return React.useMemo(
    () => ({
      size,
      setSize,
      orientation,
      setOrientation,
      label,
      setLabel,
    }),
    [size, setSize, orientation, setOrientation, label, setLabel]
  );
};
