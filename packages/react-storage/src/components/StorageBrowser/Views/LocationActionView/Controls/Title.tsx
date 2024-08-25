import React from 'react';

import { useControl } from '../../../context/controls';
import { TitleControl } from '../../Controls/Title';

export const Title = (): React.JSX.Element | null => {
  const [{ actions, selected }] = useControl({ type: 'ACTION_SELECT' });
  const { type } = selected;

  if (!type || !actions?.[type]?.options?.displayName) {
    return null;
  }

  return <TitleControl>{actions[type].options?.displayName}</TitleControl>;
};
