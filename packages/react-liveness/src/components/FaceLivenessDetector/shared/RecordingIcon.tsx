import React from 'react';

import { Text, Flex, Icon } from '@aws-amplify/ui-react';
import { LivenessClassNames } from '../types/classNames';

interface RecordingIconProps {
  children: string;
}

export const RecordingIcon: React.FC<RecordingIconProps> = ({ children }) => {
  return (
    <Flex className={LivenessClassNames.RecordingIcon}>
      <Flex data-testid="rec-icon" justifyContent="center">
        <Icon viewBox={{ width: 20, height: 20 }} width="20" height="20">
          <circle cx="10" cy="10" r="8" fill="red" />
        </Icon>
      </Flex>
      <Text as="span" fontWeight="bold">
        {children}
      </Text>
    </Flex>
  );
};
