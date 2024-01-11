import * as React from 'react';
import { Flex, Loader, View } from '@aws-amplify/ui-react';
import { LivenessClassNames } from '../types/classNames';
import { Toast } from './Toast';

interface ToastWithLoaderProps {
  displayText: string;
}

export const ToastWithLoader: React.FC<ToastWithLoaderProps> = ({
  displayText,
}) => {
  return (
    <Toast aria-live="polite">
      <Flex className={LivenessClassNames.HintText}>
        <Loader />
        <View>{displayText}</View>
      </Flex>
    </Toast>
  );
};
