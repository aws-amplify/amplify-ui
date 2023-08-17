import * as React from 'react';
import classNames from 'classnames';

import { Button } from '../Button';
import { IconClose } from '../Icon/internal';
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
  { onDismiss, children, className, ...rest },
  ref
) => {
  const { setDismissed } = useMessageContext();

  const dismissMessage = React.useCallback(() => {
    setDismissed(true);
    if (isFunction(onDismiss)) {
      onDismiss();
    }
  }, [setDismissed, onDismiss]);
  return (
    <Button
      variation="link"
      colorTheme="overlay"
      aria-label={ComponentText.Message.dismissButtonLabel}
      className={classNames(ComponentClassNames.MessageDismiss, className)}
      ref={ref}
      onClick={() => dismissMessage()}
      {...rest}
    >
      <IconClose aria-hidden="true" />
      {children}
    </Button>
  );
};

export const MessageDismiss: ForwardRefPrimitive<
  BaseMessageDismissProps,
  'div'
> = React.forwardRef(MessageDismissPrimitive);

MessageDismiss.displayName = 'MessageContent';
