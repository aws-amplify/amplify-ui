import React from 'react';

import { Title } from '../composables/Title';
import { ViewElement } from '../context/elements';
import { ControlProps } from './types';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { useTitle } from './hooks/useTitle';

export const TitleControl = ({
  className,
}: ControlProps): React.JSX.Element => {
  const props = useTitle();
  const ResolvedTitle = useResolvedComposable(Title, 'Title');

  return (
    <ViewElement className={className}>
      <ResolvedTitle {...props} />
    </ViewElement>
  );
};
