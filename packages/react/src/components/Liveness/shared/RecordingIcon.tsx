import React from 'react';

import { useTheme } from '../../../hooks';
import { Text, Flex } from '../../../primitives';

export const RecordingIcon: React.FC = () => {
  const { tokens } = useTheme();

  return (
    <Flex
      direction="column"
      alignItems="center"
      backgroundColor={`${tokens.colors.background.primary}`}
      padding={`${tokens.space.xxs}`}
      gap={`${tokens.space.xxs}`}
      borderRadius={`${tokens.borderWidths.large}`}
    >
      <Flex data-testid="rec-icon" justifyContent="center">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="red"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="8" />
        </svg>
      </Flex>
      <Text
        color={`${tokens.colors.font.primary}`}
        fontWeight={`${tokens.fontWeights.bold}`}
      >
        Rec
      </Text>
    </Flex>
  );
};
