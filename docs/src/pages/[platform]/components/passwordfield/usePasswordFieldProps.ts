import * as React from 'react';
import { PasswordField, PasswordFieldProps } from '@aws-amplify/ui-react';
import { PasswordFieldControlsProps } from './passwordFieldPropControls';
import { demoState } from '@/utils/demoState';

export interface UsePasswordFieldProps {
  (initialValues: PasswordFieldProps): PasswordFieldControlsProps;
}

export const usePasswordFieldProps: UsePasswordFieldProps = (initialValues) => {
  const [autoComplete, setAutoComplete] = React.useState(
    initialValues.autoComplete
  );
  const [defaultValue, setDefaultValue] = React.useState(
    initialValues.defaultValue
  );
  const [descriptiveText, setDescriptiveText] = React.useState(
    initialValues.descriptiveText
  );
  const [errorMessage, setErrorMessage] = React.useState(
    initialValues.errorMessage
  );
  const [hasError, setHasError] = React.useState(initialValues.hasError);
  const [hideShowPassword, setHideShowPassword] = React.useState(
    initialValues.hideShowPassword
  );
  const [isDisabled, setIsDisabled] = React.useState(initialValues.isDisabled);
  const [isReadOnly, setIsReadOnly] = React.useState(initialValues.isReadOnly);
  const [isRequired, setIsRequired] = React.useState(initialValues.isRequired);
  const [label, setLabel] = React.useState(initialValues.label);
  const [labelHidden, setLabelHidden] = React.useState(
    initialValues.labelHidden
  );
  const [name, setName] = React.useState(initialValues.name);
  const [placeholder, setPlaceholder] = React.useState(
    initialValues.placeholder
  );
  const [size, setSize] = React.useState(initialValues.size);
  const [value, setValue] = React.useState(initialValues.value);
  const [variation, setVariation] = React.useState(initialValues.variation);

  React.useEffect(() => {
    demoState.set(PasswordField.displayName, {
      autoComplete,
      defaultValue,
      descriptiveText,
      errorMessage,
      hasError,
      hideShowPassword,
      isDisabled,
      isReadOnly,
      isRequired,
      label,
      labelHidden,
      name,
      placeholder,
      size,
      value,
      variation,
    });
  }, [
    autoComplete,
    defaultValue,
    descriptiveText,
    errorMessage,
    hasError,
    hideShowPassword,
    isDisabled,
    isReadOnly,
    isRequired,
    label,
    labelHidden,
    name,
    placeholder,
    size,
    value,
    variation,
  ]);

  return React.useMemo(
    () => ({
      autoComplete,
      setAutoComplete,
      defaultValue,
      setDefaultValue,
      descriptiveText,
      setDescriptiveText,
      errorMessage,
      setErrorMessage,
      hasError,
      setHasError,
      hideShowPassword,
      setHideShowPassword,
      isDisabled,
      setIsDisabled,
      isReadOnly,
      setIsReadOnly,
      isRequired,
      setIsRequired,
      label,
      setLabel,
      labelHidden,
      setLabelHidden,
      name,
      setName,
      placeholder,
      setPlaceholder,
      size,
      setSize,
      value,
      setValue,
      variation,
      setVariation,
    }),
    [
      autoComplete,
      setAutoComplete,
      defaultValue,
      setDefaultValue,
      descriptiveText,
      setDescriptiveText,
      errorMessage,
      setErrorMessage,
      hasError,
      setHasError,
      hideShowPassword,
      setHideShowPassword,
      isDisabled,
      setIsDisabled,
      isReadOnly,
      setIsReadOnly,
      isRequired,
      setIsRequired,
      label,
      setLabel,
      labelHidden,
      setLabelHidden,
      name,
      setName,
      placeholder,
      setPlaceholder,
      size,
      setSize,
      value,
      setValue,
      variation,
      setVariation,
    ]
  );
};
