import React from 'react';
import { View, Flex } from '@aws-amplify/ui-react';
import theme from '@aws-amplify/ui-theme-base';

const baseColors = [
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'purple',
  'pink',
];

export const Colors = () => {
  return (
    <>
      {baseColors.map((baseColor) => (
        <Flex direction="row" style={{ marginBottom: theme.space.large.value }}>
          {Object.values(theme.colors[baseColor]).map(({ name, value }) => (
            <View
              key={name}
              width="5rem"
              height="5rem"
              backgroundColor={value}
            />
          ))}
        </Flex>
      ))}
    </>
  );
};
