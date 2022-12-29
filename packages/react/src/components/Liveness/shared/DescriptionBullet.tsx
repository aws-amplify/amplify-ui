import * as React from 'react';

import { Flex, Text } from '../../../primitives';
import { LivenessClassNames } from '../types/classNames';

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
    <Flex className={LivenessClassNames.DescriptionBullet}>
      <Flex className={LivenessClassNames.DescriptionBulletIndexContainer}>
        <Text as="span" className={LivenessClassNames.DescriptionBulletIndex}>
          {index}
        </Text>
      </Flex>

      <Flex className={LivenessClassNames.DescriptionBulletMessageContainer}>
        {title && (
          <Text className={LivenessClassNames.DescriptionBulletMessageTitle}>
            {title}
          </Text>
        )}
        <Text className={LivenessClassNames.DescriptionBulletMessageBody}>
          {desc}
        </Text>
      </Flex>
    </Flex>
  );
};
