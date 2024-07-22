import { useState } from 'react';
import { useConfirmUserAttribute } from '../useConfirmUserAttribute/constants';
import { useDeleteUserAttributes } from '../useDeleteUserAttributes/constants';
import { useFetchUserAttributes } from '../useFetchUserAttributes/constants';
import { useSendUserAttributeVerificationCode } from '../useSendCode/constants';
import { useUpdateUserAttributes } from '../useUpdateUserAttributes/constants';
import {
  AttributeHandler,
  HandlerInputs,
  UseUserAttributes,
  AttributeState,
} from './types';
import React from 'react';

export const useUserAttributes: UseUserAttributes = () => {
  const [deleteState, handleDelete] = useDeleteUserAttributes();
  const [confirmState, handleConfirm] = useConfirmUserAttribute();
  const [sendCodeState, handleSendCode] =
    useSendUserAttributeVerificationCode();
  const [updateState, handleUpdate] = useUpdateUserAttributes();
  const [fetchState, handleFetch] = useFetchUserAttributes();

  const [state, setState] = useState<AttributeState>({
    attributes: fetchState.data,
    pendingVerification: [
      {
        name: 'email',
        currentValue: fetchState.data.email,
      },
      {
        name: 'phone_number',
        currentValue: fetchState.data.phone_number,
      },
    ],
    confirmStatus: {
      isLoading: confirmState.isLoading,
      hasError: confirmState.hasError,
      message: confirmState.message,
    },
    deleteStatus: {
      isLoading: deleteState.isLoading,
      hasError: deleteState.hasError,
      message: deleteState.message,
    },
    fetchStatus: {
      isLoading: fetchState.isLoading,
      hasError: fetchState.hasError,
      message: fetchState.message,
    },
    sendCodeStatus: {
      isLoading: sendCodeState.isLoading,
      hasError: sendCodeState.hasError,
      message: sendCodeState.message,
    },
    updateStatus: {
      isLoading: updateState.isLoading,
      hasError: updateState.hasError,
      message: updateState.message,
    },
  });

  const handleAttributes: AttributeHandler = (input: HandlerInputs) => {
    switch (input.type) {
      case 'CONFIRM':
        handleConfirm(input.data);
        break;
      case 'DELETE':
        handleDelete(input.data);
        break;
      case 'UPDATE':
        handleUpdate(input.data);
        break;
      case 'SEND_CODE':
        handleSendCode(input.data);
        break;
    }
    handleFetch();
  };

  React.useEffect(() => {
    handleFetch();
  }, [deleteState.isLoading, updateState.isLoading, handleFetch]);

  React.useEffect(() => {
    setState({
      attributes: fetchState.data,
      pendingVerification: [
        {
          name: 'email',
          codeDeliveryDetails: {
            destination:
              updateState.data.email?.nextStep?.codeDeliveryDetails
                ?.destination,
            medium:
              updateState.data.email?.nextStep?.codeDeliveryDetails
                ?.deliveryMedium,
          },
          currentValue: fetchState.data.email,
        },
        {
          name: 'phone_number',
          codeDeliveryDetails: {
            destination:
              updateState.data.phone_number?.nextStep?.codeDeliveryDetails
                ?.destination,
            medium:
              updateState.data.phone_number?.nextStep?.codeDeliveryDetails
                ?.deliveryMedium,
          },
          currentValue: fetchState.data.phone_number,
        },
      ],
      confirmStatus: {
        isLoading: confirmState.isLoading,
        hasError: confirmState.hasError,
        message: confirmState.message,
      },
      deleteStatus: {
        isLoading: deleteState.isLoading,
        hasError: deleteState.hasError,
        message: deleteState.message,
      },
      fetchStatus: {
        isLoading: fetchState.isLoading,
        hasError: fetchState.hasError,
        message: fetchState.message,
      },
      sendCodeStatus: {
        isLoading: sendCodeState.isLoading,
        hasError: sendCodeState.hasError,
        message: sendCodeState.message,
      },
      updateStatus: {
        isLoading: updateState.isLoading,
        hasError: updateState.hasError,
        message: updateState.message,
      },
    });
  }, [fetchState, updateState, confirmState, deleteState, sendCodeState]);

  return [state, handleAttributes];
};
