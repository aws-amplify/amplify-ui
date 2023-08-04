import * as React from 'react';
import { Fieldset, CheckboxField, TextField } from '@aws-amplify/ui-react';
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
      ? `\n  isDisabled=${JSON.stringify(props.isDisabled)}`
      : '') +
    `
  ></Fieldset>`
  );
};

const defaultFieldsetProps = {
  legend: 'Favorite fruits',
  isDisabled: false,
};

export const FieldsetDemo = () => {
  const fieldsetProps = useFieldsetProps(
    demoState.get(Fieldset.displayName) || defaultFieldsetProps
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
      >
        <CheckboxField
          label="Subscribe"
          size={fieldsetProps.size}
          name="subscribe"
          value="yes"
        />
        <CheckboxField
          label="Subscribe"
          size={fieldsetProps.size}
          name="subscribe"
          value="yes"
        />
        <TextField label="Street Address" />
      </Fieldset>
    </Demo>
  );
};
