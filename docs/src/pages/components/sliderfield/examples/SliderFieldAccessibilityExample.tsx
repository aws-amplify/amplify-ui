import { SliderField, Flex, Button } from '@aws-amplify/ui-react';
import * as React from 'react';

export const SliderFieldAccessibilityExample = () => {
  const [labelHidden, setLabelHidden] = React.useState(false);
  const [isValueHidden, setIsValueHidden] = React.useState(false);

  return (
    <>
      <SliderField
        label="Accessibility demo"
        labelHidden={labelHidden}
        isValueHidden={isValueHidden}
        defaultValue={50}
      />
      <Flex>
        <Button onClick={() => setLabelHidden(!labelHidden)}>
          {labelHidden ? 'Show label' : 'Hide label'}
        </Button>
        <Button onClick={() => setIsValueHidden(!isValueHidden)}>
          {isValueHidden ? 'Show value' : 'Hide value'}
        </Button>
      </Flex>
    </>
  );
};
