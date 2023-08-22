import * as React from 'react';
import {
  Fieldset,
  FieldsetVariation,
  CheckboxField,
  TextField,
  FieldsetProps,
} from '@aws-amplify/ui-react';
import { Demo } from '@/components/Demo';
import { FieldsetPropControls } from './FieldsetPropControls';
import { useFieldsetProps } from './useFieldsetProps';
import { demoState } from '@/utils/demoState';

const propsToCode = (props) => {
  return (
    `<Fieldset` +
    (props.variation
      ? `\n  variation=${JSON.stringify(props.variation)}`
      : '') +
    (props.size ? `\n  size=${JSON.stringify(props.size)}` : '') +
    (props.isDisabled
      ? `\n  isDisabled={${JSON.stringify(props.isDisabled)}}`
      : '') +
    `>
  <CheckboxField
    label="Apple"` +
    (props.size ? `\n    size=${JSON.stringify(props.size)}` : '') +
    `
    name="apple"
    value="yes"
  />
  <CheckboxField
    label="Pear"` +
    (props.size ? `\n    size=${JSON.stringify(props.size)}` : '') +
    `
    name="pear"
    value="yes"
  />
  <TextField ` +
    (props.size ? `\n    size=${JSON.stringify(props.size)}` : '') +
    `
    label="Street Address" 
  />
</Fieldset>`
  );
};

const defaultFieldsetProps: FieldsetProps = {
  legend: 'Favorite fruits',
  isDisabled: false,
  direction: 'column',
  variation: 'outlined',
};

export const FieldsetDemo = () => {
  const fieldsetProps = useFieldsetProps(
    (demoState.get('Fieldset') as FieldsetProps) || defaultFieldsetProps
  );

  return (
    <Demo
      code={propsToCode(fieldsetProps)}
      propControls={<FieldsetPropControls {...fieldsetProps} />}
    >
      <Fieldset
        variation={fieldsetProps.variation}
        size={fieldsetProps.size}
        isDisabled={fieldsetProps.isDisabled}
        legend={fieldsetProps.legend}
        direction={fieldsetProps.direction}
      >
        <CheckboxField
          label="Apple"
          size={fieldsetProps.size}
          name="apple"
          value="yes"
        />
        <CheckboxField
          label="Pear"
          size={fieldsetProps.size}
          name="pear"
          value="yes"
        />
      </Fieldset>
    </Demo>
  );
};
