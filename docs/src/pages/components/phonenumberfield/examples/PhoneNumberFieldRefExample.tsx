import { PhoneNumberField, Flex } from '@aws-amplify/ui-react';
import * as React from 'react';

export const PhoneNumberFieldRefExample = () => {
  const inputRef = React.useRef(null);
  const countryCodeRef = React.useRef(null);

  const [inputValue, setInputValue] = React.useState('');

  const onBlur = () => {
    countryCodeRef.current.focus();
    setInputValue(inputRef.current.value);
  };
  return (
    <Flex direction="column">
      <PhoneNumberField
        ref={inputRef}
        countryCodeRef={countryCodeRef}
        label="Phone number"
        defaultCountryCode="+1"
        onBlur={onBlur}
      />
      <code>`inputRef` value: {inputValue}</code>
    </Flex>
  );
};
