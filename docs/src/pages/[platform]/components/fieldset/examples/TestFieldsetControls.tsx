import {
  Autocomplete,
  Button,
  CheckboxField,
  PasswordField,
  PhoneNumberField,
  Radio,
  RadioGroupField,
  SearchField,
  SelectField,
  SliderField,
  StepperField,
  SwitchField,
  TextAreaField,
  TextField,
  ToggleButton,
  Flex,
  Fieldset,
} from '@aws-amplify/ui-react';

export const TestFieldsetControls = () => {
  return (
    <Flex direction="column" as="form">
      <Fieldset variation="outlined" legend="Parent fieldset" isDisabled={true}>
        <TextField label="Last name" isDisabled={false} />
        <Fieldset
          name="main fieldset"
          variation="outlined"
          legend="Nested fieldset"
          direction="column"
          isDisabled={false}
        >
          <Fieldset isDisabled={true} legend="subnested Legend">
            <TextField label="Last name" isDisabled={false} />
          </Fieldset>
          <Autocomplete
            labelHidden={false}
            label="Autocomplete"
            isDisabled={false}
            options={[
              { id: 'apple', label: 'apple' },
              { id: 'banana', label: 'banana' },
              { id: 'cherry', label: 'cherry' },
              { id: 'grape', label: 'grape' },
              { id: 'kiwis', label: 'kiwis' },
              { id: 'lemon', label: 'lemon' },
              { id: 'mango', label: 'mango' },
              { id: 'orange', label: 'orange' },
              { id: 'strawberry', label: 'strawberry' },
            ]}
            placeholder="Search here..."
          />
          <Button isDisabled={false}>Button</Button>
          <CheckboxField
            label="Subscribe"
            name="subscribe"
            value="yes"
            isDisabled={false}
          />
          <SelectField
            label="Fruit"
            descriptiveText="What's your favorite fruit?"
            isDisabled={false}
          >
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="orange">Orange</option>
          </SelectField>
          <PasswordField
            autoComplete="new-password"
            descriptiveText="Please enter password"
            label="Password"
            name="password"
            size="small"
            isDisabled={false}
          />
          <PhoneNumberField
            defaultDialCode="+1"
            label="Phone number"
            descriptiveText="Please enter your phone number"
            placeholder="234-567-8910"
            isDisabled={false}
          />
          <SearchField
            label="Search"
            placeholder="Search here..."
            isDisabled={false}
          />
          <TextField label="Last name" isDisabled={false} />
          <StepperField
            max={10}
            min={0}
            step={1}
            label="Stepper"
            isDisabled={false}
          />
          <ToggleButton isDisabled={false}>Press me!</ToggleButton>
          <TextAreaField
            label="Last name"
            name="last_name"
            rows={3}
            isDisabled={false}
          />
          <RadioGroupField label="Language" name="language" isDisabled={false}>
            <Radio value="HTML">HTML</Radio>
            <Radio value="CSS">CSS</Radio>
            <Radio value="JavaScript">JavaScript</Radio>
          </RadioGroupField>
          <SwitchField label="SwitchField" isDisabled={false} />
          <SliderField label="Slider" max={100} isDisabled={false} />
        </Fieldset>
      </Fieldset>
    </Flex>
  );
};
