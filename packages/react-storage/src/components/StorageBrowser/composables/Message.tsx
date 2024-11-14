import React from 'react';

import {
  ButtonElement,
  IconElement,
  MessageVariant,
  ViewElement,
} from '../context/elements';

import { STORAGE_BROWSER_BLOCK } from '../constants';

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
    <ViewElement
      className={`${STORAGE_BROWSER_BLOCK}__message`}
      role="alert"
      variant={type}
    >
      <IconElement variant={type} aria-label={ariaLabel} />
      <ViewElement className={`${STORAGE_BROWSER_BLOCK}__message-content`}>
        {content}
      </ViewElement>
      {!onDismiss ? null : (
        <ButtonElement
          onClick={onDismiss}
          className={`${STORAGE_BROWSER_BLOCK}__message-dismiss`}
          variant="message-dismiss"
          aria-label="Dismiss message"
          role="button"
        >
          <IconElement
            variant="dismiss"
            className={`${STORAGE_BROWSER_BLOCK}__message-dismiss-icon`}
          />
        </ButtonElement>
      )}
    </ViewElement>
  );
};
