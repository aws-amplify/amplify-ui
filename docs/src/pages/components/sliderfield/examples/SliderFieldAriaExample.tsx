import { SliderField, Text } from '@aws-amplify/ui-react';
import * as React from 'react';

const userFeedback = [
  'Strongly disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly agree',
];

export const SliderFieldAriaExample = () => {
  const [index, setIndex] = React.useState(2);

  return (
    <>
      <SliderField
        ariaValuetext={userFeedback[index]}
        label="I tend to be more introverted."
        value={index}
        onChange={setIndex}
        max={4}
        isValueHidden
      />
      <Text>{userFeedback[index]}</Text>
    </>
  );
};
