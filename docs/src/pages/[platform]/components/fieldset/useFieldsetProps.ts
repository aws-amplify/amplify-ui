import { demoState } from '@/utils/demoState';
import { Fieldset, FieldsetProps } from '@aws-amplify/ui-react';
import * as React from 'react';

import { FieldsetPropControlsProps } from './FieldsetPropControls';

interface UseFieldsetProps {
  (initialValues: FieldsetProps): FieldsetPropControlsProps;
}

export const useFieldsetProps: UseFieldsetProps = (initialValues) => {
  const [direction, setDirection] = React.useState<FieldsetProps['direction']>(
    initialValues.direction
  );
  const [isDisabled, setIsDisabled] = React.useState<
    FieldsetProps['isDisabled']
  >(initialValues.isDisabled);
  const [legend, setLegend] = React.useState<FieldsetProps['legend']>(
    initialValues.legend
  );
  const [legendHidden, setLegendHidden] = React.useState<
    FieldsetProps['legendHidden']
  >(initialValues.legendHidden);
  const [size, setSize] = React.useState<FieldsetProps['size']>(
    initialValues.size
  );
  const [variation, setVariation] = React.useState<FieldsetProps['variation']>(
    initialValues.variation
  );

  React.useEffect(() => {
    demoState.set(Fieldset.displayName, {
      direction,
      isDisabled,
      legend,
      legendHidden,
      size,
      variation,
    });
  }, [direction, isDisabled, legend, legendHidden, size, variation]);

  return React.useMemo(
    () => ({
      direction,
      isDisabled,
      legend,
      legendHidden,
      size,
      variation,
      setDirection,
      setIsDisabled,
      setLegend,
      setLegendHidden,
      setSize,
      setVariation,
    }),
    [direction, isDisabled, legend, legendHidden, size, variation]
  );
};
