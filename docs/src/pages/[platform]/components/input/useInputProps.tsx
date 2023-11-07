import { demoState } from '@/utils/demoState';
import { InputProps } from '@aws-amplify/ui-react';
import * as React from 'react';
import { InputPropControlsProps } from './InputPropControls';

interface UseInputProps {
  (initialValues: InputProps): InputPropControlsProps;
}

export const useInputProps: UseInputProps = (initialValues) => {
  const [size, setSize] = React.useState<InputProps['size']>(
    initialValues.size
  );
  const [placeholder, setPlaceholder] = React.useState<
    InputProps['placeholder']
  >(initialValues.placeholder);

  const [hasError, setHasError] = React.useState<InputProps['hasError']>(
    initialValues.hasError
  );
  const [isDisabled, setIsDisabled] = React.useState<InputProps['isDisabled']>(
    initialValues.isDisabled
  );

  const [variation, setVariation] = React.useState<InputProps['variation']>(
    initialValues.variation
  );

  React.useEffect(() => {
    demoState.set('Input', {
      variation,
      setVariation,
      size,
      setSize,
      placeholder,
      setPlaceholder,
      hasError,
      setHasError,
      isDisabled,
      setIsDisabled,
    });
  }, [
    variation,
    setVariation,
    size,
    setSize,
    placeholder,
    setPlaceholder,
    hasError,
    setHasError,
    isDisabled,
    setIsDisabled,
  ]);

  return React.useMemo(
    () => ({
      variation,
      setVariation,
      size,
      setSize,
      placeholder,
      setPlaceholder,
      hasError,
      setHasError,
      isDisabled,
      setIsDisabled,
    }),
    [
      variation,
      setVariation,
      size,
      setSize,
      placeholder,
      setPlaceholder,
      hasError,
      setHasError,
      isDisabled,
      setIsDisabled,
    ]
  );
};
