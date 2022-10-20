import { PhoneNumberField, Flex, Text } from '@aws-amplify/ui-react';
import * as React from 'react';

export const RefsExample = () => {
  const inputRef = React.useRef(null);
  const dialCodeRef = React.useRef(null);

  const [inputRefValue, setInputRefValue] = React.useState('');

  const onBlur = () => {
    dialCodeRef.current.focus();
    setInputRefValue(inputRef.current.value);
  };

  return (
    <Flex direction="column">
      <PhoneNumberField
        ref={inputRef}
        dialCodeRef={dialCodeRef}
        label="Phone number"
        defaultDialCode="+1"
        onBlur={onBlur}
      />
      <Text>`inputRef` value: {inputRefValue}</Text>
    </Flex>
  );
};
