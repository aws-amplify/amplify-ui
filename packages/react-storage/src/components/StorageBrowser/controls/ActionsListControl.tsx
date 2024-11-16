import React from 'react';

import { ControlProps } from './types';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { ActionsList } from '../composables/ActionsList';
import { useActionsList } from './hooks/useActionsList';
import { ViewElement } from '../context/elements';

export const ActionsListControl = ({
  className,
}: ControlProps): React.JSX.Element => {
  const props = useActionsList();
  const ResolvedActionsList = useResolvedComposable(ActionsList, 'ActionsList');

  return (
    <ViewElement className={className}>
      <ResolvedActionsList {...props} />
    </ViewElement>
  );
};
