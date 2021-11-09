import React from 'react';

import { useTheme } from '../../../hooks';
import { IconFiberManualRecord, Text, Flex, View } from '../../../primitives';

export const RecordingIcon: React.FC = () => {
  const { tokens } = useTheme();

  return (
    <Flex
      direction="column"
      alignItems="center"
      backgroundColor={`${tokens.colors.black}`}
      padding={`${tokens.space.xxs}`}
      gap={`${tokens.space.xxs}`}
      borderRadius={`${tokens.borderWidths.large}`}
    >
      <View color="red">
        <IconFiberManualRecord size="large" viewBox="0 0 20 20" />
      </View>
      <Text
        color={`${tokens.colors.white}`}
        fontWeight={`${tokens.fontWeights.bold}`}
      >
        Rec
      </Text>
    </Flex>
  );
};
