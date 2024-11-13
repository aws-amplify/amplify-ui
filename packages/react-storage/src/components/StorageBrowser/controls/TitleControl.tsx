import React from 'react';

import { Title } from '../composables/Title';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { useTitle } from './hooks/useTitle';

export const TitleControl = (): React.JSX.Element => {
  const props = useTitle();
  const ResolvedTitle = useResolvedComposable(Title, 'Title');

  return <ResolvedTitle {...props} />;
};
