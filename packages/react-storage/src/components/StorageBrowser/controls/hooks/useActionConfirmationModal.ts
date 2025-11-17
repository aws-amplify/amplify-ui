import type { ActionConfirmationModalProps } from '../../components/composables/ActionConfirmationModal';

export interface UseActionConfirmationModalInput {
  isOpen?: boolean;
  title?: string;
  message?: string;
  content?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

export const useActionConfirmationModal = (
  input: UseActionConfirmationModalInput = {}
): ActionConfirmationModalProps => {
  return {
    isOpen: input.isOpen ?? false,
    title: input.title ?? 'Confirm Action',
    message: input.message ?? '',
    content: input.content,
    onConfirm: input.onConfirm,
    onCancel: input.onCancel,
    confirmLabel: input.confirmLabel ?? 'Confirm',
    cancelLabel: input.cancelLabel ?? 'Cancel',
  };
};
