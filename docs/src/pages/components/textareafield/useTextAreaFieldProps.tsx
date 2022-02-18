import { TextAreaFieldProps } from '@aws-amplify/ui-react';
import * as React from 'react';

export const useTextAreaFieldProps = (initialValues: TextAreaFieldProps) => {
  const [autoComplete, setAutoComplete] = React.useState<
    TextAreaFieldProps['autoComplete']
  >(initialValues.autoComplete);

  const [defaultValue, setDefaultValue] = React.useState<
    TextAreaFieldProps['defaultValue']
  >(initialValues.defaultValue);

  const [hasError, setHasError] = React.useState<
    TextAreaFieldProps['hasError']
  >(initialValues.hasError);

  const [label, setLabel] = React.useState<TextAreaFieldProps['label']>(
    initialValues.label
  );

  // start here:
  const [descriptiveText, setDescriptiveText] = React.useState<
    TextAreaFieldProps['descriptiveText']
  >(initialValues.descriptiveText);

  const [errorMessage, setErrorMessage] = React.useState<
    TextAreaFieldProps['errorMessage']
  >(initialValues.errorMessage);

  const [isDisabled, setIsDisabled] = React.useState<
    TextAreaFieldProps['isDisabled']
  >(initialValues.isDisabled);

  const [isReadOnly, setIsReadOnly] = React.useState<
    TextAreaFieldProps['isReadOnly']
  >(initialValues.isReadOnly);

  const [isRequired, setIsRequired] = React.useState<
    TextAreaFieldProps['isRequired']
  >(initialValues.isRequired);

  const [labelHidden, setLabelHidden] = React.useState<
    TextAreaFieldProps['labelHidden']
  >(initialValues.labelHidden);

  const [placeholder, setPlaceholder] = React.useState<
    TextAreaFieldProps['placeholder']
  >(initialValues.placeholder);

  const [size, setSize] = React.useState<TextAreaFieldProps['size']>(
    initialValues.size
  );

  const [name, setName] = React.useState<TextAreaFieldProps['name']>(
    initialValues.name
  );

  const [value, setValue] = React.useState<TextAreaFieldProps['value']>(
    initialValues.value
  );

  const [variation, setVariation] = React.useState<
    TextAreaFieldProps['variation']
  >(initialValues.variation);

  return {
    autoComplete,
    defaultValue,
    descriptiveText,
    errorMessage,
    hasError,
    isDisabled,
    isReadOnly,
    isRequired,
    label,
    labelHidden,
    name,
    placeholder,
    setAutoComplete,
    setDefaultValue,
    setDescriptiveText,
    setErrorMessage,
    setHasError,
    setIsDisabled,
    setIsReadOnly,
    setIsRequired,
    setLabel,
    setLabelHidden,
    setName,
    setPlaceholder,
    setSize,
    setValue,
    setVariation,
    size,
    value,
    variation,
  };
};
