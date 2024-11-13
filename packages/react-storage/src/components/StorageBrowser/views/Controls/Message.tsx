import React from 'react';

import { ButtonElement, ViewElement } from '../../context/elements/definitions';
import { IconElement } from '../../context/elements/IconElement';

import { MessageVariant } from '../../context/elements';
import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../../constants';
interface MessageControlProps {
  variant?: MessageVariant;
  children?: React.ReactNode;
}

export const MessageControl = ({
  variant,
  children,
}: MessageControlProps): React.JSX.Element | null => {
  const [dismissed, setDismissed] = React.useState<boolean>(false);

  let ariaLabel;
  switch (variant) {
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

  return dismissed ? null : (
    <ViewElement
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__message`}
      role="alert"
      variant={variant}
    >
      <IconElement variant={variant} aria-label={ariaLabel} />
      <ViewElement
        className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__message-content`}
      >
        {children}
      </ViewElement>
      <ButtonElement
        onClick={() => setDismissed(true)}
        className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__message-dismiss`}
        variant="message-dismiss"
        aria-label="Dismiss message"
      >
        <IconElement
          variant="dismiss"
          className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__message-dismiss-icon`}
        />
      </ButtonElement>
    </ViewElement>
  );
};
