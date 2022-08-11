import { demoState } from '@/utils/demoState';
import { TextFieldProps } from '@aws-amplify/ui-react';
import * as React from 'react';
import { TextFieldPropControlsProps } from './TextFieldPropControls';

interface UseTextFieldProps {
  (initialValues: TextFieldProps): TextFieldPropControlsProps;
}

export const useTextFieldProps: UseTextFieldProps = (initialValues) => {
  const [variation, setVariation] = React.useState<TextFieldProps['variation']>(
    initialValues.variation
  );
  const [size, setSize] = React.useState<TextFieldProps['size']>(
    initialValues.size
  );
  const [descriptiveText, setDescriptiveText] = React.useState<
    TextFieldProps['descriptiveText']
  >(initialValues.descriptiveText);
  const [placeholder, setPlaceholder] = React.useState<
    TextFieldProps['placeholder']
  >(initialValues.placeholder);
  const [label, setLabel] = React.useState<TextFieldProps['label']>(
    initialValues.label
  );
  const [labelHidden, setLabelHidden] = React.useState<
    TextFieldProps['labelHidden']
  >(initialValues.labelHidden);
  const [errorMessage, setErrorMessage] = React.useState<
    TextFieldProps['errorMessage']
  >(initialValues.errorMessage);
  const [hasError, setHasError] = React.useState<TextFieldProps['hasError']>(
    initialValues.hasError
  );
  const [isDisabled, setIsDisabled] = React.useState<
    TextFieldProps['isDisabled']
  >(initialValues.isDisabled);

  React.useEffect(() => {
    demoState.set('TextField', {
      variation,
      setVariation,
      size,
      setSize,
      descriptiveText,
      setDescriptiveText,
      placeholder,
      setPlaceholder,
      label,
      setLabel,
      labelHidden,
      setLabelHidden,
      errorMessage,
      setErrorMessage,
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
    descriptiveText,
    setDescriptiveText,
    placeholder,
    setPlaceholder,
    label,
    setLabel,
    labelHidden,
    setLabelHidden,
    errorMessage,
    setErrorMessage,
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
      descriptiveText,
      setDescriptiveText,
      placeholder,
      setPlaceholder,
      label,
      setLabel,
      labelHidden,
      setLabelHidden,
      errorMessage,
      setErrorMessage,
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
      descriptiveText,
      setDescriptiveText,
      placeholder,
      setPlaceholder,
      label,
      setLabel,
      labelHidden,
      setLabelHidden,
      errorMessage,
      setErrorMessage,
      hasError,
      setHasError,
      isDisabled,
      setIsDisabled,
    ]
  );
};
