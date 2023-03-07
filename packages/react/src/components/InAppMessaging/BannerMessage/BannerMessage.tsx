import React from 'react';
import classNames from 'classnames';

import { useBreakpointValue } from '../../../hooks/useBreakpointValue';
import { Flex } from '../../../primitives/Flex';

import { useMessageProps } from '../hooks';
import { MessageLayout } from '../MessageLayout';

import { BLOCK_CLASS } from './constants';
import { BannerMessageProps } from './types';

export function BannerMessage(props: BannerMessageProps): JSX.Element | null {
  const messageProps = useMessageProps(props);
  const shouldBeFullWidth = useBreakpointValue([true, true, false]);
  const { shouldRenderMessage, styles } = messageProps;

  if (!shouldRenderMessage) {
    return null;
  }

  const { alignment = 'right', position = 'top' } = props;
  const isCenterMiddle = alignment === 'center' && position === 'middle';

  return (
    <Flex
      className={classNames(BLOCK_CLASS, {
        [`${BLOCK_CLASS}--${position}`]: !isCenterMiddle,
        [`${BLOCK_CLASS}--${alignment}`]: !isCenterMiddle,
        [`${BLOCK_CLASS}--center-middle`]: isCenterMiddle,
        [`${BLOCK_CLASS}--full-width`]: shouldBeFullWidth,
      })}
      role="dialog"
      testId={`inappmessaging-${position}banner-dialog`}
    >
      <MessageLayout
        {...props}
        {...messageProps}
        orientation="horizontal"
        buttonSize="small"
        styles={styles}
      />
    </Flex>
  );
}
