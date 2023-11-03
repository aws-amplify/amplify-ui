import * as React from 'react';
import { Flex, View, ViewProps, useTheme } from '@aws-amplify/ui-react';

import { LivenessClassNames } from '../types/classNames';

interface ToastProps extends ViewProps {
  variation?: 'default' | 'primary' | 'error';
  size?: 'medium' | 'large';
  heading?: string;
  isInitial?: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  variation = 'default',
  size = 'medium',
  children,
  isInitial = false,
  ...rest
}) => {
  const { tokens } = useTheme();
  return (
    <View
      className={`${LivenessClassNames.Toast} ${LivenessClassNames.Toast}--${variation} ${LivenessClassNames.Toast}--${size}`}
      maxWidth={{ base: '100%' }}
      {...((variation === 'primary' || variation === 'error') && {
        borderRadius: 'unset',
        fontSize: 'xxl',
        padding: '0 var(--amplify-space-xs)',
      })}
      {...(isInitial && { backgroundColor: tokens.colors.white })}
      {...rest}
    >
      <Flex className={LivenessClassNames.ToastContainer}>
        <Flex
          className={LivenessClassNames.ToastMessage}
          {...(isInitial ? { color: tokens.colors.black } : {})}
        >
          {children}
        </Flex>
      </Flex>
    </View>
  );
};
