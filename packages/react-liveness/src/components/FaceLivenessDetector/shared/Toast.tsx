import * as React from 'react';
import { Flex, View, ViewProps } from '@aws-amplify/ui-react';

import { LivenessClassNames } from '../types/classNames';

interface ToastProps extends ViewProps {
  variation?: 'default' | 'primary' | 'error';
  size?: 'medium' | 'large';
  heading?: string;
}

export const Toast: React.FC<ToastProps> = ({
  variation = 'default',
  size = 'medium',
  children,
  ...rest
}) => {
  return (
    <View
      padding="small"
      borderRadius="medium"
      className={`${LivenessClassNames.Toast} ${LivenessClassNames.Toast}--${variation} ${LivenessClassNames.Toast}--${size}`}
      maxWidth={{ base: '100%', small: '70%' }}
      {...rest}
    >
      <Flex gap="xs" direction="column" alignItems="center">
        <Flex
          className={`${LivenessClassNames.Toast}__message`}
          textAlign="center"
          direction="column"
        >
          {children}
        </Flex>
      </Flex>
    </View>
  );
};
