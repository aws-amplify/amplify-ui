import React from 'react';

import { Title } from '../composables/Title';
import { ViewElement } from '../context/elements';
import { ControlProps } from './types';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { useTitle } from './hooks/useTitle';

export const TitleControl = ({
  className,
}: ControlProps): React.JSX.Element | null => {
  const { props } = useTitle();
  const ResolvedTitle = useResolvedComposable(Title, 'Title');

  if (!props) {
    return null;
  }

  const { children, titleClassName } = props;

  return (
    <ViewElement className={className ? className : titleClassName}>
      <ResolvedTitle titleClassName={className ? className : titleClassName}>
        {children}
      </ResolvedTitle>
    </ViewElement>
  );
};
