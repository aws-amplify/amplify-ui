import * as React from 'react';

import { BaseTextAreaFieldProps } from '@aws-amplify/ui-react';

export const useTextAreaFieldProps = (
  initialValues: BaseTextAreaFieldProps
) => {
  const [autoComplete, setAutoComplete] = React.useState<
    BaseTextAreaFieldProps['autoComplete']
  >(initialValues.autoComplete);

  const [defaultValue, setDefaultValue] = React.useState<
    BaseTextAreaFieldProps['defaultValue']
  >(initialValues.defaultValue);

  const [hasError, setHasError] = React.useState<
    BaseTextAreaFieldProps['hasError']
  >(initialValues.hasError);

  const [label, setLabel] = React.useState<BaseTextAreaFieldProps['label']>(
    initialValues.label
  );

  const [descriptiveText, setDescriptiveText] = React.useState<
    BaseTextAreaFieldProps['descriptiveText']
  >(initialValues.descriptiveText);

  const [errorMessage, setErrorMessage] = React.useState<
    BaseTextAreaFieldProps['errorMessage']
  >(initialValues.errorMessage);

  const [isDisabled, setIsDisabled] = React.useState<
    BaseTextAreaFieldProps['isDisabled']
  >(initialValues.isDisabled);

  const [isReadOnly, setIsReadOnly] = React.useState<
    BaseTextAreaFieldProps['isReadOnly']
  >(initialValues.isReadOnly);

  const [isRequired, setIsRequired] = React.useState<
    BaseTextAreaFieldProps['isRequired']
  >(initialValues.isRequired);

  const [labelHidden, setLabelHidden] = React.useState<
    BaseTextAreaFieldProps['labelHidden']
  >(initialValues.labelHidden);

  const [placeholder, setPlaceholder] = React.useState<
    BaseTextAreaFieldProps['placeholder']
  >(initialValues.placeholder);

  const [maxLength, setMaxLength] = React.useState<
    BaseTextAreaFieldProps['maxLength']
  >(initialValues.maxLength);

  const [name, setName] = React.useState<BaseTextAreaFieldProps['name']>(
    initialValues.name
  );

  const [rows, setRows] = React.useState<BaseTextAreaFieldProps['rows']>(
    initialValues.rows
  );

  const [size, setSize] = React.useState<BaseTextAreaFieldProps['size']>(
    initialValues.size
  );

  const [value, setValue] = React.useState<BaseTextAreaFieldProps['value']>(
    initialValues.value
  );

  const [variation, setVariation] = React.useState<
    BaseTextAreaFieldProps['variation']
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
