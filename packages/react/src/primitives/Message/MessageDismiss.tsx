import * as React from 'react';
import classNames from 'classnames';

import { Button } from '../Button';
import { VisuallyHidden } from '../VisuallyHidden';
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
  { onDismiss: overrideOnDismiss, showIcon, children, className, ...rest },
  ref
) => {
  const { setDismissed, onDismiss } = useMessageContext();

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
      {showIcon ?? <IconClose aria-hidden="true" />}
      {children ? (
        children
      ) : (
        <VisuallyHidden>
          {ComponentText.Message.dismissButtonLabel}
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
