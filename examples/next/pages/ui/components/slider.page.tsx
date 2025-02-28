import * as React from 'react';
import {
  Button,
  Accordion,
  Flex,
  Heading,
  Divider,
  Text,
  ToggleButton,
  SliderField,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function ExpanderPage() {
  const [isPressed, setIsPressed] = React.useState(false);
  const [value, setValue] = React.useState(50);

  return (
    <>
      <ToggleButton
        isPressed={isPressed}
        onChange={() => {
          setIsPressed(!isPressed);
          setValue(Math.floor(Math.random() * 101));
        }}
      >
        Press me!
      </ToggleButton>
      <SliderField value={value} onChange={setValue} label="Test" />
      <SliderField defaultValue={50} label="Test" />
      {/* <SliderField value={value} onChange={setValue} label="Test" /> */}
    </>
  );
}
