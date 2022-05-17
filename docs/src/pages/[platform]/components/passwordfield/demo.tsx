import { PasswordField, PasswordFieldProps } from '@aws-amplify/ui-react';
import * as React from 'react';

import { Demo } from '@/components/Demo';
import {
  filterDemoProps,
  getDemoProps,
  objectEntriesToPropString,
} from '../utils/demoProps';
import { PasswordFieldPropControls } from './passwordFieldPropControls';
import { usePasswordFieldProps } from './usePasswordFieldProps';
import { demoState } from '@/utils/demoState';

export const propsToCode = (props) => {
  const filteredProps = filterDemoProps(props);
  return `
<PasswordField
${objectEntriesToPropString(Object.entries(filteredProps))}
/>`;
};

export const PasswordFieldDemo = () => {
  const passwordFieldProps = usePasswordFieldProps(
    (demoState.get(PasswordField.displayName) as PasswordFieldProps) || {
      autoComplete: 'new-password',
      defaultValue: '',
      descriptiveText: 'Please enter password',
      errorMessage: '',
      hasError: false,
      hideShowPassword: false,
      isDisabled: false,
      isReadOnly: false,
      isRequired: false,
      label: 'Password',
      labelHidden: false,
      name: 'password',
      placeholder: '',
      size: 'small',
      value: '',
      variation: null,
    }
  );
  const demoProps = [
    'autoComplete',
    'defaultValue',
    'descriptiveText',
    'errorMessage',
    'hasError',
    'hideShowPassword',
    'isDisabled',
    'isReadOnly',
    'isRequired',
    'label',
    'labelHidden',
    'name',
    'placeholder',
    'size',
    'value',
    'variation',
  ];
  const passwordFieldDemoProps = getDemoProps(passwordFieldProps, demoProps);
  return (
    <Demo
      code={propsToCode(passwordFieldDemoProps)}
      propControls={<PasswordFieldPropControls {...passwordFieldProps} />}
    >
      <PasswordField
        autoComplete={passwordFieldProps.autoComplete}
        descriptiveText={passwordFieldProps.descriptiveText}
        defaultValue={passwordFieldProps.defaultValue}
        errorMessage={passwordFieldProps.errorMessage}
        hasError={passwordFieldProps.hasError}
        hideShowPassword={passwordFieldProps.hideShowPassword}
        isDisabled={passwordFieldProps.isDisabled}
        isReadOnly={passwordFieldProps.isReadOnly}
        isRequired={passwordFieldProps.isRequired}
        label={passwordFieldProps.label}
        labelHidden={passwordFieldProps.labelHidden}
        name={passwordFieldProps.name}
        placeholder={passwordFieldProps.placeholder}
        size={passwordFieldProps.size}
        value={passwordFieldProps.value || null}
        variation={passwordFieldProps.variation}
      />
    </Demo>
  );
};
