import * as React from 'react';
import { Input, InputProps } from '@aws-amplify/ui-react';
import { Demo } from '@/components/Demo';
import { InputPropControls } from './InputPropControls';
import { useInputProps } from './useInputProps';
import { demoState } from '@/utils/demoState';
import { getPropString } from '../utils/getPropString';

const propsToCode = (props) => {
  return (
    `<Input` +
    getPropString(props.variation, 'variation') +
    getPropString(props.size, 'size') +
    getPropString(props.placeholder, 'placeholder') +
    (props.hasError ? '\n  hasError' : '') +
    (props.isDisabled ? '\n  isDisabled' : '') +
    `\n/>`
  );
};

const defaultInputProps: InputProps = {
  placeholder: 'Baggins',
};

export const InputDemo = () => {
  const InputProps = useInputProps(
    (demoState.get('Input') as InputProps) || defaultInputProps
  );

  return (
    <Demo
      code={propsToCode(InputProps)}
      propControls={<InputPropControls {...InputProps} />}
    >
      <Input
        aria-label="Demo input"
        variation={InputProps.variation}
        size={InputProps.size}
        placeholder={InputProps.placeholder}
        hasError={InputProps.hasError}
        isDisabled={InputProps.isDisabled}
      />
    </Demo>
  );
};
