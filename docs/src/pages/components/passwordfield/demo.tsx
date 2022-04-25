import * as React from 'react';

import {
  PasswordField,
  PasswordFieldProps,
  TextFieldProps,
} from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { usePasswordFieldProps } from '@/components/usePasswordFieldProps';
import { GetFieldControls } from '../shared/GetFieldControls';
import { PasswordFieldPropControls } from './passwordFieldPropControls';

const propsToCode = (props) => {
  return `
  <PasswordField label="Password" name="password" />
  `;
};

export const PasswordFieldDemo = () => {
  const textFieldProps = usePasswordFieldProps({
    autoComplete: 'new-password',
    defaultValue: '',
    descriptiveText: 'Please enter password with at least 8 characters',
    errorMessage: '',
    hasError: false,
    inputMode: 'text',
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    label: 'Password',
    labelHidden: false,
    name: 'password',
    placeholder: '',
    size: 'small',
    type: null,
    value: undefined,
    variation: 'quiet',
    hideShowPassword: false,
  });
  const [
    [autoComplete],
    [setAutoComplete],
    [defaultValue],
    [setDefaultValue],
    [descriptiveText],
    [setDescriptiveText],
    [errorMessage],
    [setErrorMessage],
    [hasError],
    [setHasError],
    [inputMode],
    [setInputMode],
    [isDisabled],
    [setIsDisabled],
    [isReadOnly],
    [setIsReadOnly],
    [isRequired],
    [setIsRequired],
    [label],
    [setLabel],
    [labelHidden],
    [setLabelHidden],
    [name],
    [setName],
    [placeholder],
    [setPlaceholder],
    [size],
    [setSize],
    [type],
    [setType],
    [value],
    [setValue],
    [variation],
    [setVariation],
    [hideShowPassword],
    [setHideShowPassword],
  ] = textFieldProps;
  return (
    <Demo
      code={propsToCode('test')}
      propControls={<PasswordFieldPropControls {...textFieldProps} />}
    >
      <PasswordField
        autoComplete={autoComplete as TextFieldProps['autoComplete']}
        descriptiveText={descriptiveText as TextFieldProps['descriptiveText']}
        defaultValue={defaultValue as TextFieldProps['defaultValue']}
        errorMessage={errorMessage as TextFieldProps['errorMessage']}
        hasError={hasError as unknown as boolean}
        inputMode={inputMode as TextFieldProps['inputMode']}
        isDisabled={isDisabled as unknown as boolean}
        isReadOnly={isReadOnly as unknown as boolean}
        isRequired={isRequired as unknown as boolean}
        label={label as TextFieldProps['label']}
        labelHidden={labelHidden as unknown as boolean}
        name={name as TextFieldProps['name']}
        placeholder={placeholder as TextFieldProps['placeholder']}
        size={size as TextFieldProps['size']}
        variation={variation as TextFieldProps['variation']}
        hideShowPassword={
          hideShowPassword as unknown as PasswordFieldProps['hideShowPassword']
        }
      />
    </Demo>
  );
};
