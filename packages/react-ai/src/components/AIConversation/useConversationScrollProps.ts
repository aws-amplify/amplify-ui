import * as React from 'react';

import type { ScrollViewProps } from '@aws-amplify/ui-react';
import { useHasValueUpdated } from '@aws-amplify/ui-react-core';

import type { ConversationMessage } from '../../types';

interface ConverationScrollProps
  extends Pick<ScrollViewProps, 'onScroll' | 'autoScroll'> {}

export default function useConversationScrollProps(
  messages: ConversationMessage[]
): ConverationScrollProps {
  const [autoScroll, setAutoScroll] =
    React.useState<ConverationScrollProps['autoScroll']>('smooth');

  const messagesLength = messages.length;
  const hasMessagesLengthChanged = useHasValueUpdated(messagesLength, true);

  const lastScrollTop = React.useRef<number | undefined>();

  const onScroll: ConverationScrollProps['onScroll'] = ({ currentTarget }) => {
    if (autoScroll !== 'smooth') return;

    const { scrollTop } = currentTarget;

    // set `autoScroll` and `lastScrollTop` to `undefined` on user scroll up
    if (lastScrollTop.current && scrollTop < lastScrollTop.current) {
      setAutoScroll(undefined);
      lastScrollTop.current = undefined;
    } else {
      lastScrollTop.current = scrollTop;
    }
  };

  React.useEffect(() => {
    // reset `autoScroll` to 'smooth' on new message
    if (hasMessagesLengthChanged) {
      setAutoScroll('smooth');
    }
  }, [hasMessagesLengthChanged]);

  return { autoScroll, onScroll };
}
