import * as React from 'react';
import { RadioGroupField, RadioGroupFieldProps } from '@aws-amplify/ui-react';

import { RadioGroupFieldPropControlsProps } from './RadioGroupFieldPropControls';
import { demoState } from '@/utils/demoState';

interface UseRadioGroupFieldProps {
  (initialValues?: RadioGroupFieldProps): RadioGroupFieldPropControlsProps;
}

export const useRadioGroupFieldProps: UseRadioGroupFieldProps = (
  initialValues
) => {
  const [direction, setDirection] = React.useState<
    RadioGroupFieldProps['direction']
  >(initialValues.direction);
  const [isDisabled, setIsDisabled] = React.useState<
    RadioGroupFieldProps['isDisabled']
  >(initialValues.isDisabled);
  const [legend, setLegend] = React.useState<RadioGroupFieldProps['legend']>(
    initialValues.label
  );
  const [variation, setVariation] = React.useState<
    RadioGroupFieldProps['variation']
  >(initialValues.label);
  const [name, setName] = React.useState<RadioGroupFieldProps['name']>(
    initialValues.name
  );
  const [size, setSize] = React.useState<RadioGroupFieldProps['size']>(
    initialValues.size
  );
  const [labelPosition, setLabelPosition] = React.useState<
    RadioGroupFieldProps['labelPosition']
  >(initialValues.labelPosition);

  React.useEffect(() => {
    demoState.set(RadioGroupField.displayName, {
      direction,
      isDisabled,
      legend,
      name,
      size,
      labelPosition,
    });
  }, [direction, isDisabled, legend, name, size, labelPosition]);

  return React.useMemo(
    () => ({
      ...initialValues,
      direction,
      legend,
      labelPosition,
      name,
      size,
      isDisabled,
      variation,
      setDirection,
      setIsDisabled,
      setLegend,
      setName,
      setSize,
      setLabelPosition,
      setVariation,
    }),
    [
      initialValues,
      direction,
      legend,
      labelPosition,
      name,
      size,
      isDisabled,
      variation,
      setDirection,
      setIsDisabled,
      setLegend,
      setName,
      setSize,
      setLabelPosition,
      setVariation,
    ]
  );
};
