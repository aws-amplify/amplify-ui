import React from 'react';

import { ButtonElement, ViewElement } from '../../context/elements/definitions';
import { IconElement } from '../../context/elements/IconElement';

import { MessageVariant } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const BLOCK_NAME = `${CLASS_BASE}__message`;
export interface MessageControlProps {
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
    <ViewElement className={BLOCK_NAME} role="alert" variant={variant}>
      <IconElement variant={variant} aria-label={ariaLabel} />
      <ViewElement className={`${BLOCK_NAME}__content`}>{children}</ViewElement>
      <ButtonElement
        onClick={() => setDismissed(true)}
        className={`${BLOCK_NAME}__dismiss`}
        variant="message-dismiss"
        aria-label="Dismiss message"
      >
        <IconElement
          variant="dismiss"
          className={`${BLOCK_NAME}__dismiss__icon`}
        />
      </ButtonElement>
    </ViewElement>
  );
};
