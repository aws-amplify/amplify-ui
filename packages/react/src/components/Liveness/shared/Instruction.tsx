import * as React from 'react';
import { useTheme } from '../../../hooks';
import { Flex, Text } from '../../..';

export interface InstructionProps {
  instruction: string;
}

export const Instruction = (props: InstructionProps): JSX.Element => {
  const { instruction } = props;

  const { tokens } = useTheme();

  return (
    <Flex
      borderRadius={`${tokens.radii.medium}`}
      width={{ base: '80%', medium: '100%' }}
      backgroundColor={{
        base: `${tokens.colors.black}`,
        medium: `${tokens.colors.transparent}`,
      }}
      padding={`${tokens.space.small}`}
      style={{ opacity: 0.5 }}
    >
      <Text
        color={{
          base: `${tokens.colors.white}`,
          medium: `${tokens.colors.black}`,
        }}
      >
        {instruction}
      </Text>
    </Flex>
  );
};
