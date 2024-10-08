import React from 'react';

import { useControl } from '../../../context/control';
import { TitleControl } from '../../Controls/Title';

export const Title = (): React.JSX.Element | null => {
  const [{ actions, selected }] = useControl('LOCATION_ACTIONS');
  const { type } = selected;

  if (!type || !actions?.[type]?.options?.displayName) {
    return null;
  }

  return <TitleControl>{actions[type].options?.displayName}</TitleControl>;
};
