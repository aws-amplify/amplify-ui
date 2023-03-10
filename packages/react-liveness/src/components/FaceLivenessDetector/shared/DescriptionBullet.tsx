import * as React from 'react';

import { Flex, Text } from '@aws-amplify/ui-react';
import { LivenessClassNames } from '../types/classNames';

export interface DescriptionBulletProps {
  index: number;
  children: string | React.ReactNode;
}

export const DescriptionBullet = (
  props: DescriptionBulletProps
): JSX.Element => {
  const { index, children } = props;

  return (
    <Flex className={LivenessClassNames.DescriptionBullet}>
      <Flex className={LivenessClassNames.DescriptionBulletIndex}>
        <Text
          as="span"
          className={LivenessClassNames.DescriptionBulletIndexText}
        >
          {index}.
        </Text>
      </Flex>

      <Text
        as="span"
        display={'flex'}
        style={{ alignItems: 'center' }}
        className={LivenessClassNames.DescriptionBulletMessage}
      >
        {children}
      </Text>
    </Flex>
  );
};
