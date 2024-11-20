import React from 'react';

import { useStore } from '../../providers/store';
// creating circular dependency
import { useViews } from '../context';

import { LocationActionViewProps } from './types';

export const LocationActionView = ({
  type,
  ...props
}: LocationActionViewProps): React.JSX.Element | null => {
  const [{ actionType = type }] = useStore();
  const views = useViews().action;

  const ActionView = actionType
    ? views[actionType as keyof typeof views]
    : undefined;

  if (ActionView) {
    return <ActionView {...props} />;
  }

  return null;
};
