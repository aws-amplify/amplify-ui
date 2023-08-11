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
  Grid,
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
    <Flex direction="column">
      <Flex direction="column" as="form" id="form1" ref={form1Ref}>
        <Fieldset
          name="The main fieldset name"
          variation="outlined"
          legend="Address"
          isDisabled={true}
        >
          <TextField label="Street Address" />
          <SelectField label="State">
            <option value="NY">NY</option>
            <option value="MI">MI</option>
            <option value="AZ">AZ</option>
          </SelectField>
          <CheckboxField label="Subscribe" name="subscribe" value="yes" />
          <PasswordField
            autoComplete="new-password"
            descriptiveText="Please enter password"
            label="Password"
            name="password"
          />
          <View>https://github.com/facebook/react/issues/15818 :(</View>
          <PhoneNumberField
            defaultDialCode="+1"
            label="Phone number"
            descriptiveText="Please enter your phone number"
            placeholder="234-567-8910"
          />
          <RadioGroupField label="Language" name="language">
            <Radio value="HTML">HTML</Radio>
            <Radio value="CSS">CSS</Radio>
            <Radio value="JavaScript">JavaScript</Radio>
          </RadioGroupField>
          <SearchField
            label="Search"
            placeholder="Search here..."
            labelHidden={false}
          />
          <StepperField max={10} min={0} step={1} label="Stepper" />
          <TextAreaField
            label="Comments"
            defaultValue="Amplify UI is awesome!"
          />
          <ToggleButton>Press me!</ToggleButton>
          <Button>normal button</Button>
        </Fieldset>
      </Flex>
      <Fieldset form="form1">
        <TextField label="A sneaky input" />
      </Fieldset>
    </Flex>
  );
};
