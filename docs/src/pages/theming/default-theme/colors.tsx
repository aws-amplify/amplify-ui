import { Flex, defaultTheme, View } from '@aws-amplify/ui-react';

const { tokens } = defaultTheme;

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
        <Flex direction="row" key={baseColor}>
          {Object.values(tokens.colors[baseColor]).map(({ name, value }) => (
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
