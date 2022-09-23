import * as React from 'react';

import { useTheme } from '../../../hooks';
import { Flex, Text } from '../../../primitives';

export interface DescriptionBulletProps {
  index: number;
  title: string;
  desc: string;
}

export const DescriptionBullet = (
  props: DescriptionBulletProps
): JSX.Element => {
  const { index, title, desc } = props;

  const { tokens } = useTheme();

  return (
    <Flex direction="row" gap={`${tokens.space.small}`}>
      <Flex
        shrink={0}
        alignItems="center"
        justifyContent="center"
        borderRadius="100%"
        backgroundColor={`${tokens.colors.brand.primary[80]}`}
        width={`${tokens.space.xl}`}
        height={`${tokens.space.xl}`}
      >
        <Text
          fontSize={`${tokens.fontSizes.small}`}
          color={`${tokens.colors.white}`}
        >
          {index}
        </Text>
      </Flex>

      <Flex direction="column" gap={`${tokens.space.xxs}`}>
        <Text fontWeight="bold">{title}</Text>
        <Text
          fontSize={`${tokens.fontSizes.small}`}
          color={`${tokens.colors.font.tertiary}`}
        >
          {desc}
        </Text>
      </Flex>
    </Flex>
  );
};
