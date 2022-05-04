import * as React from 'react';
import {
  SwitchField,
  SwitchFieldProps,
  Text,
  View,
} from '@aws-amplify/ui-react';

import { SwitchPropControls } from './SwitchPropControls';
import { useSwitchProps } from './useSwitchProps';
import { Demo } from '@/components/Demo';
import { Example } from '@/components/Example';
import { demoState } from '@/utils/demoState';

const propsToCode = (props: SwitchFieldProps) => {
  return (
    `<SwitchField` +
    (props.thumbColor
      ? `
  thumbColor={${props.thumbColor}}`
      : '') +
    (props.trackColor
      ? `
  trackColor={${props.trackColor}}`
      : '') +
    (props.trackCheckedColor
      ? `
  trackCheckedColor={${props.trackCheckedColor}}`
      : '') +
    (props.isChecked
      ? `
  isChecked={${props.isChecked}}`
      : '') +
    (props.size
      ? `
  size={${props.size}}`
      : '') +
    `
  isDisabled={${props.isDisabled}}
  label="${props.label}"
  labelPosition="${props.labelPosition}"
/>`
  );
};

const defaultSwitchProps = {
  isDisabled: false,
  size: '',
  label: 'SwitchField',
  labelPosition: 'start',
};

export const SwitchDemo = () => {
  const switchProps = useSwitchProps(
    demoState.get(SwitchField.displayName) || defaultSwitchProps
  );

  return (
    <Demo
      code={propsToCode(switchProps)}
      propControls={<SwitchPropControls {...switchProps} />}
    >
      <SwitchField
        thumbColor={switchProps.thumbColor}
        trackColor={switchProps.trackColor}
        trackCheckedColor={switchProps.trackCheckedColor}
        isChecked={switchProps.isChecked}
        isDisabled={switchProps.isDisabled}
        size={switchProps.size}
        label={switchProps.label}
        labelPosition={switchProps.labelPosition}
      />
      {typeof switchProps.isChecked !== 'undefined' && (
        <Text>
          <View as="sup">*</View>This component is in a controlled state
        </Text>
      )}
    </Demo>
  );
};

export const SwitchExample = (props) => {
  return (
    <Example>
      <SwitchField label={'This is a switch'} {...props} />
    </Example>
  );
};

export const ChangeExample = () => {
  const [switchCount, setSwitchCount] = React.useState(0);
  const changeCount = (event) => {
    setSwitchCount(switchCount + 1);
  };
  return (
    <>
      <SwitchField label={'This is a switch'} onChange={changeCount} />
      <Text>Number of times the switch has changed {switchCount}</Text>
    </>
  );
};
