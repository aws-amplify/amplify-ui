/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';

import { ObjectDetailsView } from '../components/composables/ObjectDetailsView';

import { useResolvedComposable } from './hooks/useResolvedComposable';
import { useObjectDetailView } from './hooks/useObjectDetailView';

export const ObjectDetailsViewControl = (): React.JSX.Element => {
  const props = useObjectDetailView();

  const Resolved = useResolvedComposable(
    ObjectDetailsView,
    'ObjectDetailsView'
  );

  return <Resolved {...props} />;
};
