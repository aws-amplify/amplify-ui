import * as React from 'react';

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

  return (
    <Flex direction="row" gap="small">
      <Flex
        shrink={0}
        alignItems="center"
        justifyContent="center"
        borderRadius="100%"
        backgroundColor="brand.primary.80"
        width="xl"
        height="xl"
      >
        <Text fontSize="small" as="span" color="font.inverse">
          {index}
        </Text>
      </Flex>

      <Flex direction="column" gap="xxs">
        <Text fontWeight="bold">{title}</Text>
        <Text color="font.tertiary">{desc}</Text>
      </Flex>
    </Flex>
  );
};
