import * as React from 'react';
import classNames from 'classnames';

import { useBreakpointValue } from '../../../hooks/useBreakpointValue';
import { Flex } from '../../../primitives/Flex';

import { withBackdrop } from '../Backdrop';
import { useMessageProps } from '../hooks';
import { MessageLayout } from '../MessageLayout';

import { BLOCK_CLASS } from './constants';
import { FullScreenMessageProps } from './types';

export function FullScreenMessage(
  props: FullScreenMessageProps
): JSX.Element | null {
  const messageProps = useMessageProps(props);
  const shouldBeFullScreen = useBreakpointValue([true, true, false]);
  const { shouldRenderMessage, styles } = messageProps;
  const { onClose: onClick } = props;

  if (!shouldRenderMessage) {
    return null;
  }

  const Message = () => (
    <Flex
      className={classNames(BLOCK_CLASS, {
        [`${BLOCK_CLASS}--fullscreen`]: shouldBeFullScreen,
      })}
      role="dialog"
      testId="inappmessaging-fullscreen-dialog"
    >
      <MessageLayout {...props} {...messageProps} styles={styles} />
    </Flex>
  );

  if (shouldBeFullScreen) {
    return <Message />;
  }

  const MessageWithBackdrop = withBackdrop(Message, { onClick });
  return <MessageWithBackdrop />;
}
