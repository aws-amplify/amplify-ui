import React from 'react';

import { ActionConfirmationModal } from '../components/composables/ActionConfirmationModal';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { useActionConfirmationModal } from './hooks/useActionConfirmationModal';

export const ActionConfirmationModalControl = (): React.JSX.Element => {
  const props = useActionConfirmationModal();
  const Resolved = useResolvedComposable(
    ActionConfirmationModal,
    'ActionConfirmationModal'
  );

  return <Resolved {...props} />;
};
