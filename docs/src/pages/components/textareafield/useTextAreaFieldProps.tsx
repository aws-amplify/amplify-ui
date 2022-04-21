import * as React from 'react';

import { TextAreaFieldProps } from '@aws-amplify/ui-react';

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

  const [maxLength, setMaxLength] = React.useState<
    TextAreaFieldProps['maxLength']
  >(initialValues.maxLength);

  const [name, setName] = React.useState<TextAreaFieldProps['name']>(
    initialValues.name
  );

  const [rows, setRows] = React.useState<TextAreaFieldProps['rows']>(
    initialValues.rows
  );

  const [size, setSize] = React.useState<TextAreaFieldProps['size']>(
    initialValues.size
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
    maxLength,
    name,
    placeholder,
    rows,
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
    setMaxLength,
    setName,
    setPlaceholder,
    setRows,
    setSize,
    setValue,
    setVariation,
    size,
    value,
    variation,
  };
};
