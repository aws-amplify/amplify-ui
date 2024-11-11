import React from 'react';

import { Message } from '../composables/Message';
import { ViewElement } from '../context/elements';
import { useMessage } from './hooks/useMessage';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { ControlProps } from './types';

export const MessageControl = ({
  className,
}: ControlProps): React.JSX.Element | null => {
  const props = useMessage();

  const Resolved = useResolvedComposable(Message, 'Message');

  return (
    <ViewElement className={className}>
      <Resolved {...props} />
    </ViewElement>
  );
};
