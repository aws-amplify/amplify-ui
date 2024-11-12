import React from 'react';

import {
  ButtonElement,
  IconElement,
  MessageVariant,
  ViewElement,
} from '../context/elements';

import { CLASS_BASE } from '../views/constants';

const BLOCK_NAME = `${CLASS_BASE}__message`;

export type MessageType = MessageVariant;

export interface MessageProps {
  content?: React.ReactNode;
  onDismiss?: () => void;
  type?: MessageType;
}

export const Message = ({
  content,
  onDismiss,
  type,
}: MessageProps): React.JSX.Element | null => {
  let ariaLabel;
  switch (type) {
    case 'error':
      ariaLabel = 'Error';
      break;
    case 'info':
      ariaLabel = 'Information';
      break;
    case 'warning':
      ariaLabel = 'Warning';
      break;
    case 'success':
      ariaLabel = 'Success';
      break;
  }

  return !content ? null : (
    <ViewElement className={BLOCK_NAME} role="alert" variant={type}>
      <IconElement variant={type} aria-label={ariaLabel} />
      <ViewElement className={`${BLOCK_NAME}__content`}>{content}</ViewElement>
      {!onDismiss ? null : (
        <ButtonElement
          onClick={onDismiss}
          className={`${BLOCK_NAME}__dismiss`}
          variant="message-dismiss"
          aria-label="Dismiss message"
          role="button"
        >
          <IconElement
            variant="dismiss"
            className={`${BLOCK_NAME}__dismiss__icon`}
          />
        </ButtonElement>
      )}
    </ViewElement>
  );
};
