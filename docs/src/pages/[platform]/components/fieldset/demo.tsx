import * as React from 'react';
import { Fieldset, CheckboxField, FieldsetProps } from '@aws-amplify/ui-react';
import { Demo } from '@/components/Demo';
import { FieldsetPropControls } from './FieldsetPropControls';
import { useFieldsetProps } from './useFieldsetProps';
import { demoState } from '@/utils/demoState';
import { getPropString } from '../utils/getPropString';

const propsToCode = (props) => {
  return (
    `<Fieldset` +
    getPropString(props.legend, 'legend') +
    getPropString(props.variation, 'variation') +
    getPropString(props.size, 'size') +
    getPropString(props.isDisabled, 'isDisabled') +
    getPropString(props.direction, 'direction') +
    `>
  <CheckboxField
    label="Apple"` +
    (props.size ? `\n    size=${JSON.stringify(props.size)}` : '') +
    `
    name="apple"
  />
  <CheckboxField
    label="Pear"` +
    (props.size ? `\n    size=${JSON.stringify(props.size)}` : '') +
    `
    name="pear"
  />
</Fieldset>`
  );
};

const defaultFieldsetProps: FieldsetProps = {
  legend: 'Favorite fruits',
  legendHidden: false,
  isDisabled: false,
  direction: 'column',
  variation: 'plain',
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
        legendHidden={fieldsetProps.legendHidden}
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
