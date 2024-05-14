import { SelectField, SelectFieldProps } from '@aws-amplify/ui-react';
import * as React from 'react';

import { SelectFieldPropControlsProps } from './SelectFieldPropControls';
import { demoState } from '@/utils/demoState';

interface UseSelectFieldProps {
  (initialValues?: SelectFieldProps): SelectFieldPropControlsProps;
}

export const useSelectFieldProps: UseSelectFieldProps = (initialValues) => {
  const [descriptiveText, setDescriptiveText] = React.useState<
    SelectFieldProps['descriptiveText']
  >(initialValues.descriptiveText);
  const [errorMessage, setErrorMessage] = React.useState<
    SelectFieldProps['errorMessage']
  >(initialValues.errorMessage);
  const [hasError, setHasError] = React.useState<SelectFieldProps['hasError']>(
    initialValues.hasError
  );
  const [isDisabled, setIsDisabled] = React.useState<
    SelectFieldProps['isDisabled']
  >(initialValues.isDisabled);
  const [label, setLabel] = React.useState<SelectFieldProps['label']>(
    initialValues.label
  );
  const [labelHidden, setLabelHidden] = React.useState<
    SelectFieldProps['labelHidden']
  >(initialValues.labelHidden);
  const [size, setSize] = React.useState<SelectFieldProps['size']>(
    initialValues.size
  );
  const [variation, setVariation] = React.useState<
    SelectFieldProps['variation']
  >(initialValues.variation);
  const [isMultiple, setIsMultiple] = React.useState<
    SelectFieldProps['isMultiple']
  >(initialValues.isMultiple);
  const [selectSize, setSelectSize] = React.useState<
    SelectFieldProps['selectSize']
  >(initialValues.selectSize);

  React.useEffect(() => {
    demoState.set(SelectField.displayName, {
      descriptiveText,
      errorMessage,
      hasError,
      isDisabled,
      label,
      labelHidden,
      size,
      variation,
      isMultiple,
      selectSize,
    });
  }, [
    descriptiveText,
    errorMessage,
    hasError,
    isDisabled,
    label,
    labelHidden,
    size,
    variation,
    isMultiple,
    selectSize,
  ]);

  return React.useMemo(
    () => ({
      descriptiveText,
      errorMessage,
      hasError,
      label,
      labelHidden,
      size,
      variation,
      isDisabled,
      isMultiple,
      selectSize,
      setDescriptiveText,
      setErrorMessage,
      setHasError,
      setIsDisabled,
      setLabel,
      setLabelHidden,
      setSize,
      setVariation,
      setIsMultiple,
      setSelectSize,
    }),
    [
      descriptiveText,
      errorMessage,
      hasError,
      label,
      labelHidden,
      size,
      variation,
      isDisabled,
      isMultiple,
      selectSize,
      setDescriptiveText,
      setErrorMessage,
      setHasError,
      setIsDisabled,
      setLabel,
      setLabelHidden,
      setSize,
      setVariation,
      setIsMultiple,
      setSelectSize,
    ]
  );
};
