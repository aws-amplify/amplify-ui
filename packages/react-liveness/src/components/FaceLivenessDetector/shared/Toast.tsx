import * as React from 'react';
import {
  Flex,
  View,
  Text,
  AlertVariations,
  useTheme,
} from '@aws-amplify/ui-react';
import { AlertIcon } from '@aws-amplify/ui-react/internal';

interface ToastProps {
  variation?: AlertVariations;
  heading?: string;
}

export const Toast: React.FC<ToastProps> = ({
  variation,
  children,
  heading,
}) => {
  const { tokens } = useTheme();
  const isToastWithIcon = variation === 'success' || variation === 'error';
  return (
    <View
      padding="small"
      borderRadius="medium"
      backgroundColor="background.primary"
      maxWidth={{ base: '100%', small: '70%' }}
      border={`1px solid ${tokens.colors.border.primary}`} // // FIXME: this only makes sense in light mode
    >
      <Flex gap="xs" direction="column" alignItems="center">
        {isToastWithIcon || heading ? (
          <Flex
            gap="xs"
            alignItems="center"
            color={variation ? `font.${variation}` : 'font.primary'}
            data-testid="toast-icon"
          >
            {isToastWithIcon ? (
              <AlertIcon ariaHidden variation={variation} />
            ) : null}
            {heading ? <Text fontWeight="bold">{heading}</Text> : children}
          </Flex>
        ) : null}

        {heading || !isToastWithIcon ? (
          <Flex color="font.primary" textAlign="center" direction="column">
            {children}
          </Flex>
        ) : null}
      </Flex>
    </View>
  );
};
