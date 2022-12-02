import * as React from 'react';
import classNames from 'classnames';

import { useBreakpointValue } from '../../../hooks/useBreakpointValue';
import { Flex } from '../../../primitives/Flex';

import { useMessageProps } from '../hooks';
import { MessageLayout } from '../MessageLayout';

import { BLOCK_CLASS, DIALOG_CLASS } from './constants';
import { ModalMessageProps } from './types';

export function ModalMessage(props: ModalMessageProps): JSX.Element | null {
  const messageProps = useMessageProps(props);
  const shouldBeFullWidth = useBreakpointValue([true, true, false]);
  const { shouldRenderMessage, styles } = messageProps;

  if (!shouldRenderMessage) {
    return null;
  }

  return (
    <Flex className={BLOCK_CLASS}>
      <Flex
        className={classNames(DIALOG_CLASS, {
          [`${DIALOG_CLASS}--full-width`]: shouldBeFullWidth,
        })}
        role="dialog"
      >
        <MessageLayout {...props} {...messageProps} styles={styles} />
      </Flex>
    </Flex>
  );
}
