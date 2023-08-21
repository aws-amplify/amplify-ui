import * as React from 'react';
import classNames from 'classnames';

import { Button } from '../Button';
import { VisuallyHidden } from '../VisuallyHidden';
import { IconClose, useIcons } from '../Icon/internal';
import { ComponentClassNames, ComponentText } from '../shared/constants';
import { useMessageContext } from './useMessageContext';
import { isFunction } from '@aws-amplify/ui';

import {
  MessageDismissProps,
  BaseMessageDismissProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';

const MessageDismissPrimitive: Primitive<MessageDismissProps, 'button'> = (
  {
    onDismiss: overrideOnDismiss,
    dismissButtonLabel,
    hasIcon = true,
    children,
    className,
    ...rest
  },
  ref
) => {
  const { setDismissed, onDismiss } = useMessageContext();
  const icons = useIcons('message');

  const dismissMessage = React.useCallback(() => {
    setDismissed(true);
    if (isFunction(overrideOnDismiss)) {
      overrideOnDismiss();
    } else if (isFunction(onDismiss)) {
      onDismiss();
    } else {
      return;
    }
  }, [setDismissed, onDismiss, overrideOnDismiss]);
  return (
    <Button
      variation="link"
      colorTheme="overlay"
      className={classNames(ComponentClassNames.MessageDismiss, className)}
      ref={ref}
      onClick={() => dismissMessage()}
      {...rest}
    >
      {hasIcon ? icons?.close ?? <IconClose aria-hidden="true" /> : null}
      {/* 
        Customers may include children content for Message.Dismiss, in which case
        we should not show our accessibly hidden label.
      */}
      {children ? (
        children
      ) : (
        <VisuallyHidden>
          {dismissButtonLabel
            ? dismissButtonLabel
            : ComponentText.Message.dismissButtonLabel}
        </VisuallyHidden>
      )}
    </Button>
  );
};

export const MessageDismiss: ForwardRefPrimitive<
  BaseMessageDismissProps,
  'div'
> = React.forwardRef(MessageDismissPrimitive);

MessageDismiss.displayName = 'MessageContent';
