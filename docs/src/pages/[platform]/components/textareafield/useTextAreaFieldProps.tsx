import * as React from 'react';

import { BaseTextAreaFieldProps } from '@aws-amplify/ui-react';

export const useTextAreaFieldProps = (
  initialValues: BaseTextAreaFieldProps
) => {
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

  const [labelHidden, setLabelHidden] = React.useState<
    BaseTextAreaFieldProps['labelHidden']
  >(initialValues.labelHidden);

  const [placeholder, setPlaceholder] = React.useState<
    BaseTextAreaFieldProps['placeholder']
  >(initialValues.placeholder);

  const [name, setName] = React.useState<BaseTextAreaFieldProps['name']>(
    initialValues.name
  );

  const [rows, setRows] = React.useState<BaseTextAreaFieldProps['rows']>(
    initialValues.rows
  );

  const [size, setSize] = React.useState<BaseTextAreaFieldProps['size']>(
    initialValues.size
  );

  const [variation, setVariation] = React.useState<
    BaseTextAreaFieldProps['variation']
  >(initialValues.variation);

  return {
    descriptiveText,
    errorMessage,
    hasError,
    isDisabled,
    isReadOnly,
    label,
    labelHidden,
    name,
    placeholder,
    rows,
    setDescriptiveText,
    setErrorMessage,
    setHasError,
    setIsDisabled,
    setIsReadOnly,
    setLabel,
    setLabelHidden,
    setName,
    setPlaceholder,
    setRows,
    setSize,
    setVariation,
    size,
    variation,
  };
};
