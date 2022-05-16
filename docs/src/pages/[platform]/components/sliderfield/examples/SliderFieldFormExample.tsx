import { SliderField, Button, Flex } from '@aws-amplify/ui-react';
import * as React from 'react';

export const SliderFieldFormExample = () => {
  const [value, setValue] = React.useState(5);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    alert(`Waterslide enjoyment: ${event.target.waterslides.value}`);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <SliderField
        label="On a scale from 1-10, how much do you enjoy waterslides?"
        name="waterslides"
        min={1}
        max={10}
        value={value}
        onChange={setValue}
        isDisabled={isDisabled}
      />
      <Flex>
        <Button type="submit">Submit</Button>
        <Button onClick={() => setIsDisabled(!isDisabled)}>
          {isDisabled ? 'Enable SelectField' : 'Disable SelectField'}
        </Button>
      </Flex>
    </form>
  );
};
