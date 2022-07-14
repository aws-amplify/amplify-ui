import * as React from 'react';
import { TextField, TextFieldProps } from '@aws-amplify/ui-react';
import { Demo } from '@/components/Demo';
import { TextFieldPropControls } from './TextFieldPropControls';
import { useTextFieldProps } from './useTextFieldProps';
import { demoState } from '@/utils/demoState';
import { getPropString } from '../utils/getPropString';

const propsToCode = (props) => {
  return (
    `<TextField` +
    getPropString(props.variation, 'variation') +
    getPropString(props.size, 'size') +
    getPropString(props.descriptiveText, 'descriptiveText') +
    getPropString(props.placeholder, 'placeholder') +
    getPropString(props.label, 'label') +
    (props.isLabelHidden ? '\n isLabelHidden' : '') +
    getPropString(props.label, 'errorMessage') +
    (props.hasError ? '\n hasError' : '') +
    (props.isDisabled ? '\n isDisabled' : '') +
    `/>`
  );
};

const defaultTextFieldProps: TextFieldProps = {
  descriptiveText: 'this is descriptive text',
  placeholder: 'this is the placeholder',
  label: 'this is the label',
  errorMessage: 'this is the error message',
};

export const TextFieldDemo = () => {
  const textFieldProps = useTextFieldProps(
    (demoState.get('TextField') as TextFieldProps) || defaultTextFieldProps
  );

  return (
    <Demo
      code={propsToCode(textFieldProps)}
      propControls={<TextFieldPropControls {...textFieldProps} />}
    >
      <TextField
        variation={textFieldProps.variation}
        size={textFieldProps.size}
        descriptiveText={textFieldProps.descriptiveText}
        placeholder={textFieldProps.placeholder}
        label={textFieldProps.label}
        labelHidden={textFieldProps.labelHidden}
        errorMessage={textFieldProps.errorMessage}
        hasError={textFieldProps.hasError}
        isDisabled={textFieldProps.isDisabled}
      />
    </Demo>
  );
};
