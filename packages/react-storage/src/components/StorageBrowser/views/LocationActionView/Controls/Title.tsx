import React from 'react';

import { TitleControl } from '../../Controls/Title';
import { useStore } from '../../../providers/store';
import { useTempActions } from '../../../do-not-import-from-here/createTempActionsProvider';

export const Title = (): React.JSX.Element | null => {
  const [{ actionType }] = useStore();
  const actions = useTempActions();
  const action = actionType ? actions[actionType] : undefined;
  const title = action?.options?.displayName ?? '-';

  return <TitleControl>{title}</TitleControl>;
};
