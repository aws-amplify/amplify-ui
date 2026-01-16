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
  const modalRef = React.useRef<HTMLDivElement>(null);
  const confirmButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (isOpen && confirmButtonRef.current) {
      confirmButtonRef.current.focus();
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

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
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCancel?.();
        }
      }}
    >
      <View
        ref={modalRef}
        backgroundColor="background.primary"
        padding="large"
        borderRadius="medium"
        boxShadow="large"
        maxWidth="500px"
        width="90%"
        role="document"
      >
        <Heading level={4} marginBottom="medium" id="modal-title">
          {title}
        </Heading>
        {message && (
          <Text marginBottom="medium" id="modal-description">
            {message}
          </Text>
        )}
        {content && <View marginBottom="medium">{content}</View>}
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
            ref={confirmButtonRef}
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
