import { demoState } from '@/utils/demoState';
import { PhoneNumberField, PhoneNumberFieldProps } from '@aws-amplify/ui-react';
import * as React from 'react';

import { PhoneNumberFieldPropControlsProps } from './PhoneNumberFieldPropControls';

interface UsePhoneNumberFieldProps {
  (initialValues: PhoneNumberFieldProps): PhoneNumberFieldPropControlsProps;
}

export const usePhoneNumberFieldProps: UsePhoneNumberFieldProps = (
  initialValues
) => {
  const [label, setLabel] = React.useState<PhoneNumberFieldProps['label']>(
    initialValues.label
  );
  const [labelHidden, setLabelHidden] = React.useState<
    PhoneNumberFieldProps['labelHidden']
  >(initialValues.labelHidden);
  const [descriptiveText, setDescriptiveText] = React.useState<
    PhoneNumberFieldProps['descriptiveText']
  >(initialValues.descriptiveText);
  const [placeholder, setPlaceholder] = React.useState<
    PhoneNumberFieldProps['placeholder']
  >(initialValues.placeholder);
  const [size, setSize] = React.useState<PhoneNumberFieldProps['size']>(
    initialValues.size
  );
  const [variation, setVariation] = React.useState<
    PhoneNumberFieldProps['variation']
  >(initialValues.variation);
  const [errorMessage, setErrorMessage] = React.useState<
    PhoneNumberFieldProps['errorMessage']
  >(initialValues.errorMessage);
  const [hasError, setHasError] = React.useState<
    PhoneNumberFieldProps['hasError']
  >(initialValues.hasError);
  const [isDisabled, setIsDisabled] = React.useState<
    PhoneNumberFieldProps['isDisabled']
  >(initialValues.isDisabled);
  const [isReadOnly, setIsReadOnly] = React.useState<
    PhoneNumberFieldProps['isReadOnly']
  >(initialValues.isReadOnly);
  const [value, setValue] = React.useState<PhoneNumberFieldProps['value']>(
    initialValues.value
  );
  const [defaultDialCode, setDefaultDialCode] = React.useState<
    PhoneNumberFieldProps['defaultDialCode']
  >(initialValues.defaultDialCode);

  React.useEffect(() => {
    demoState.set(PhoneNumberField.displayName, {
      label,
      labelHidden,
      descriptiveText,
      placeholder,
      size,
      variation,
      errorMessage,
      hasError,
      isDisabled,
      isReadOnly,
      value,
      defaultDialCode,
    });
  }, [
    label,
    labelHidden,
    descriptiveText,
    placeholder,
    size,
    variation,
    errorMessage,
    hasError,
    isDisabled,
    isReadOnly,
    value,
    defaultDialCode,
  ]);

  return React.useMemo(
    () => ({
      label,
      setLabel,
      labelHidden,
      setLabelHidden,
      descriptiveText,
      setDescriptiveText,
      placeholder,
      setPlaceholder,
      size,
      setSize,
      variation,
      setVariation,
      errorMessage,
      setErrorMessage,
      hasError,
      setHasError,
      isDisabled,
      setIsDisabled,
      isReadOnly,
      setIsReadOnly,
      value,
      setValue,
      defaultDialCode,
      setDefaultDialCode,
    }),
    [
      label,
      setLabel,
      labelHidden,
      setLabelHidden,
      descriptiveText,
      setDescriptiveText,
      placeholder,
      setPlaceholder,
      size,
      setSize,
      variation,
      setVariation,
      errorMessage,
      setErrorMessage,
      hasError,
      setHasError,
      isDisabled,
      setIsDisabled,
      isReadOnly,
      setIsReadOnly,
      value,
      setValue,
      defaultDialCode,
      setDefaultDialCode,
    ]
  );
};
