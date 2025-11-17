import React from 'react';

import { ActionConfirmationModal } from '../components/composables/ActionConfirmationModal';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { useActionConfirmationModal, type UseActionConfirmationModalInput } from './hooks/useActionConfirmationModal';

export interface ActionConfirmationModalControlProps extends UseActionConfirmationModalInput {}

export const ActionConfirmationModalControl = (
  props: ActionConfirmationModalControlProps
): React.JSX.Element => {
  const modalProps = useActionConfirmationModal(props);
  const Resolved = useResolvedComposable(ActionConfirmationModal, 'ActionConfirmationModal');

  return <Resolved {...modalProps} />;
};
