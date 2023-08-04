import { demoState } from '@/utils/demoState';
import { Fieldset, FieldsetProps } from '@aws-amplify/ui-react';
import * as React from 'react';

import { FieldsetPropControlsProps } from './FieldsetPropControls';

interface UseFieldsetProps {
  (initialValues: FieldsetProps): FieldsetPropControlsProps;
}

export const useFieldsetProps: UseFieldsetProps = (initialValues) => {
  const [isDisabled, setIsDisabled] = React.useState<
    FieldsetProps['isDisabled']
  >(initialValues.isDisabled);
  const [legend, setLegend] = React.useState<FieldsetProps['legend']>(
    initialValues.legend
  );
  const [size, setSize] = React.useState<FieldsetProps['size']>(
    initialValues.size
  );
  const [variation, setVariation] = React.useState<FieldsetProps['variation']>(
    initialValues.variation
  );

  React.useEffect(() => {
    demoState.set(Fieldset.displayName, {
      isDisabled,
      legend,
      size,
      variation,
    });
  }, [isDisabled, legend, size, variation]);

  return React.useMemo(
    () => ({
      isDisabled,
      setIsDisabled,
      legend,
      setLegend,
      size,
      setSize,
      variation,
      setVariation,
    }),
    [isDisabled, legend, size, variation]
  );
};
