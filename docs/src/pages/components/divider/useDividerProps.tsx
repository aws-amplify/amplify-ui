import { DividerOptions } from '@aws-amplify/ui-react';
import * as React from 'react';

import { DividerPropControlsProps } from './DividerPropControls';

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

  return {
    size,
    setSize,
    orientation,
    setOrientation,
    label,
    setLabel,
  };
};
