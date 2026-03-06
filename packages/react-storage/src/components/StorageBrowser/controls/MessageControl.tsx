import React from 'react';

import { Message } from '../components/composables/Message';

import { useMessage } from './hooks/useMessage';
import { useResolvedComposable } from './hooks/useResolvedComposable';

export const MessageControl = (): React.JSX.Element => {
  const props = useMessage();

  const Resolved = useResolvedComposable(Message, 'Message');

  return <Resolved {...props} />;
};
