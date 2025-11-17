import React from 'react';
import { Button, Text, View, Heading } from '@aws-amplify/ui-react';

export interface ActionConfirmationModalProps {
  isOpen?: boolean;
  title?: string;
  message?: string;
  content?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

export const ActionConfirmationModal = ({
  isOpen = false,
  title = 'Confirm Action',
  message = '',
  content,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}: ActionConfirmationModalProps): React.JSX.Element | null => {
  if (!isOpen) return null;

  return (
    <View
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      style={{
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        backgroundColor="background.primary"
        padding="large"
        borderRadius="medium"
        boxShadow="large"
        maxWidth="500px"
        width="90%"
      >
        <Heading level={4} marginBottom="medium">
          {title}
        </Heading>
        {message && (
          <Text marginBottom="medium">{message}</Text>
        )}
        {content && (
          <View marginBottom="medium">
            {content}
          </View>
        )}
        <View
          style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'flex-end',
          }}
        >
          <Button onClick={onCancel} variation="link">
            {cancelLabel}
          </Button>
          <Button
            onClick={onConfirm}
            variation="primary"
            colorTheme="error"
          >
            {confirmLabel}
          </Button>
        </View>
      </View>
    </View>
  );
};
