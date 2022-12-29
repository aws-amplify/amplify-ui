import React from 'react';

import { Text, Flex, Icon } from '../../../primitives';
import { LivenessClassNames } from '../types/classNames';

export const RecordingIcon: React.FC = () => {
  return (
    <Flex className={LivenessClassNames.RecordingIcon}>
      <Flex data-testid="rec-icon" justifyContent="center">
        <Icon viewBox={{ width: 20, height: 20 }} width="20" height="20">
          <circle cx="10" cy="10" r="8" fill="red" />
        </Icon>
      </Flex>
      <Text as="span" fontWeight="bold">
        Rec
      </Text>
    </Flex>
  );
};
