import * as React from 'react';

import { Flex, Text } from '../../../primitives';

export interface DescriptionBulletProps {
  index: number;
  title?: string;
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
        <Text fontWeight="bold" as="span" color="font.inverse">
          {index}
        </Text>
      </Flex>

      <Flex direction="column" gap="xxs">
        {title && <Text fontWeight="bold">{title}</Text>}
        <Text color="font.primary">{desc}</Text>
      </Flex>
    </Flex>
  );
};
