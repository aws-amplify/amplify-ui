import React from 'react';
import { SwitchField, Flex, Text } from '@aws-amplify/ui-react';

import { SwitchPropControls } from '@/components/SwitchPropControls';
import { useSwitchProps } from '@/components/useSwitchProps';
import { Example } from '@/components/Example';

export const SwitchDemo = () => {
  const switchProps = useSwitchProps({
    thumbColor: 'white',
    trackColor: 'blue',
    trackCheckedColor: 'red',
    isDisabled: false,
    size: '',
    label: 'SwitchField',
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
