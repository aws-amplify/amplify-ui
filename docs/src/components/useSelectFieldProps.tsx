import { SelectFieldProps } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { SelectFieldPropControlsProps } from './SelectFieldPropControls';

interface UseSelectFieldProps {
  (initialValues?: SelectFieldProps): SelectFieldPropControlsProps;
}

export const useSelectFieldProps: UseSelectFieldProps = (initialValues) => {
  const [size, setSize] = useState<SelectFieldProps['size']>(
    initialValues.size
  );
  const [variation, setVariation] = useState<SelectFieldProps['variation']>(
    initialValues.variation
  );
  const [label, setLabel] = useState<SelectFieldProps['label']>(
    initialValues.label
  );
  const [errorMessage, setErrorMessage] = useState<
    SelectFieldProps['errorMessage']
  >(initialValues.errorMessage);
  const [hasError, setHasError] = useState<SelectFieldProps['hasError']>(
    initialValues.hasError
  );
  const [labelHidden, setLabelHidden] = useState<
    SelectFieldProps['labelHidden']
  >(initialValues.labelHidden);
  const [isDisabled, setIsDisabled] = useState<SelectFieldProps['isDisabled']>(
    initialValues.isDisabled
  );
  return {
    errorMessage,
    hasError,
    label,
    labelHidden,
    size,
    variation,
    isDisabled,
    setErrorMessage,
    setHasError,
    setIsDisabled,
    setLabel,
    setLabelHidden,
    setSize,
    setVariation,
  };
};
