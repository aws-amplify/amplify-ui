import * as React from 'react';
import { SwitchField, Flex, Text } from '@aws-amplify/ui-react';

import { SwitchPropControls } from '@/components/SwitchPropControls';
import { useSwitchProps } from '@/components/useSwitchProps';
import { Example } from '@/components/Example';

export const SwitchDemo = () => {
  const switchProps = useSwitchProps({
    isDisabled: false,
    size: '',
    label: 'SwitchField',
    labelPosition: 'start',
    isLabelHidden: false,
  });

  return (
    <Flex direction="column" gap="0.5rem">
      <SwitchPropControls {...switchProps} />
      <Example>
        <SwitchField
          isChecked={switchProps.isChecked}
          thumbColor={switchProps.thumbColor}
          trackColor={switchProps.trackColor}
          trackCheckedColor={switchProps.trackCheckedColor}
          isDisabled={switchProps.isDisabled}
          size={switchProps.size}
          label={switchProps.label}
          labelPosition={switchProps.labelPosition}
          isLabelHidden={switchProps.isLabelHidden}
        />
        {typeof switchProps.isChecked !== 'undefined' && (
          <Text>
            <sup>*</sup>This component is in a controlled state
          </Text>
        )}
      </Example>
    </Flex>
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
