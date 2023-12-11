import * as React from 'react';
import { Flex, Loader, View } from '@aws-amplify/ui-react';
import { LivenessClassNames } from '../types/classNames';
import { Toast } from './Toast';

interface ToastWithLoaderProps {
  displayText: string;
  labelText?: string;
}

export const ToastWithLoader: React.FC<ToastWithLoaderProps> = ({
  displayText,
  labelText,
}) => {
  return (
    <Toast aria-live="polite" aria-label={labelText ?? displayText}>
      <Flex className={LivenessClassNames.HintText}>
        <Loader />
        <View>{displayText}</View>
      </Flex>
    </Toast>
  );
};
