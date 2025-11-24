/* eslint-disable no-console */

import type { ActionConfirmationModalProps } from '../../components/composables/ActionConfirmationModal';
import { useControlsContext } from '../context';

export const useActionConfirmationModal = (): ActionConfirmationModalProps => {
  const {
    data: { confirmationModal = {} },
    onConfirmationModalConfirm,
    onConfirmationModalCancel,
  } = useControlsContext();

  console.log(
    'useActionConfirmationModal confirmationModal',
    confirmationModal,
    onConfirmationModalConfirm,
    onConfirmationModalCancel
  );

  return {
    isOpen: false,
    title: 'Confirm Action',
    message: '',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    ...confirmationModal,
    onConfirm: onConfirmationModalConfirm,
    onCancel: onConfirmationModalCancel,
  };
};
