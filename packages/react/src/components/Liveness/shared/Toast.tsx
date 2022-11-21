import * as React from 'react';
import { Flex, View, Text, AlertVariations } from '../../../primitives';
import { LivenessAlertIcon } from './LivenessAlertIcon';

interface ToastProps {
  variation?: AlertVariations;
  heading?: string;
}

export const Toast: React.FC<ToastProps> = ({
  variation,
  children,
  heading,
}) => {
  const isToastWithIcon = variation === 'success' || variation === 'error';
  return (
    <View
      padding="small"
      borderRadius="medium"
      backgroundColor="background.primary"
    >
      <Flex
        gap="xs"
        direction="column"
        alignItems="center"
        color={variation ? variation : null}
      >
        {isToastWithIcon || heading ? (
          <Flex gap="xs" color={`font.${variation}`} alignItems="center">
            {isToastWithIcon ? (
              <LivenessAlertIcon variation={variation} />
            ) : null}
            {heading ? (
              <Text fontWeight="bold" color="font.primary">
                {heading}
              </Text>
            ) : (
              children
            )}
          </Flex>
        ) : null}

        {heading || !isToastWithIcon ? children : null}
      </Flex>
    </View>
  );
};
