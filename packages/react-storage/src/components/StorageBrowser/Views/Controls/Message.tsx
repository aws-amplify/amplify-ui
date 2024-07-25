import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import type { OmitElements } from '../types';
import { MessageVariant, StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Icon: IconElement, Button, View } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__message`;

/* <MessageDismissControl /> */
export interface MessageDismissControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Button: T['Button'];
  Icon: T['Icon'];
}

const DismissButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__dismiss`,
  'aria-label': 'Dismiss message',
});

const DismissIcon = withBaseElementProps(IconElement, {
  'aria-hidden': true,
  className: `${BLOCK_NAME}__dismiss__icon`,
  variant: 'cancel',
});

export const MessageDismissControl: MessageDismissControl = () => (
  <DismissButton>
    <DismissIcon />
  </DismissButton>
);

MessageDismissControl.Button = DismissButton;
MessageDismissControl.Icon = DismissIcon;

/* <MessageControl /> */
const Container = withBaseElementProps(View, {
  className: BLOCK_NAME,
  role: 'alert',
});

const MessageIcon: typeof IconElement = React.forwardRef(
  function MessageIcon(props, ref) {
    const { variant } = props;

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

    return variant ? (
      <IconElement
        {...props}
        className={props.className ?? `${BLOCK_NAME}__icon`}
        aria-hidden={props['aria-hidden'] ?? 'false'}
        aria-label={props['aria-label'] ?? ariaLabel}
        variant={variant}
        ref={ref}
      />
    ) : null;
  }
);

const MessageContent = withBaseElementProps(
  View,
  ({ className = `${BLOCK_NAME}__content`, ...props }) => ({
    ...props,
    className,
  })
);
interface MessageControlProps {
  variant?: MessageVariant;
}
interface _MessageControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<T, 'Icon' | 'View'> {
  ({ variant }: MessageControlProps): React.JSX.Element;
}

export interface MessageControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<_MessageControl<T>, 'Container'> {
  ({ variant }: MessageControlProps): React.JSX.Element;
}
export const MessageControl: MessageControl = ({ variant }) => {
  return (
    <Container>
      <MessageIcon variant={variant} />
      <MessageContent>
        {/* TODO: Placeholder text */}
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </MessageContent>
      <MessageDismissControl />
    </Container>
  );
};
