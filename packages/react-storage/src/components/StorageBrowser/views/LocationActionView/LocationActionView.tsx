import React from 'react';

import { useStore } from '../../store';
import { useActionViews } from '../context/actionViews';

import type { LocationActionViewType } from './types';

export const LocationActionView: LocationActionViewType = ({
  type,
  ...props
}) => {
  const [{ actionType = type }] = useStore();
  const views = useActionViews().action;

  const ActionView = actionType
    ? views[actionType as keyof typeof views]
    : undefined;

  if (ActionView) {
    return <ActionView {...props} />;
  }

  return null;
};
