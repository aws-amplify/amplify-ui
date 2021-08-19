import React, { useState } from 'react';

import { Select, View } from '@aws-amplify/ui-react';

import { SelectPropControls } from '@/components/SelectPropControls';
import { useSelectProps } from '@/components/useSelectProps';

export const SelectDemo = () => {
  const selectProps = useSelectProps({});
  return (
    <View>
      <SelectPropControls {...selectProps} />
      <View className="mt-8">
        <Select
          name="fruits"
          defaultValue=""
          placeholder="Select a fruit."
          size={selectProps.size}
          variation={selectProps.variation}
          isDisabled={selectProps.isDisabled}
        >
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
        </Select>
      </View>
    </View>
  );
};
