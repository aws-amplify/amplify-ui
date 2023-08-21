import { useRef, useEffect } from 'react';
import {
  View,
  Button,
  SelectField,
  PasswordField,
  RadioGroupField,
  SearchField,
  Radio,
  PhoneNumberField,
  Flex,
  TextField,
  CheckboxField,
  StepperField,
  TextAreaField,
  ToggleButton,
  Fieldset,
} from '@aws-amplify/ui-react';

export const BasicFieldsetExample = () => {
  const form1Ref = useRef(null);
  useEffect(() => {
    if (form1Ref.current) {
      console.log('form elements: ', form1Ref.current.elements);
    }
  });
  return (
    <Flex direction="column" as="form" id="form1" ref={form1Ref}>
      <Fieldset
        name="main fieldset"
        variation="outlined"
        legend="Address"
        isDisabled={true}
      >
        <Button>Button</Button>
      </Fieldset>
    </Flex>
  );
};
