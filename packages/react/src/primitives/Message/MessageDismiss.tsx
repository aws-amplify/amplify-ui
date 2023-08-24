import * as React from 'react';
import classNames from 'classnames';

import { Button } from '../Button';
import { VisuallyHidden } from '../VisuallyHidden';
import { IconClose, useIcons } from '../Icon/internal';
import { ComponentClassNames, ComponentText } from '../shared/constants';
import { useMessage } from './useMessage';
import { isFunction } from '@aws-amplify/ui';

import {
  MessageDismissProps,
  BaseMessageDismissProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';

const MessageDismissPrimitive: Primitive<MessageDismissProps, 'button'> = (
  { onDismiss, dismissLabel, hasIcon = true, children, className, ...rest },
  ref
) => {
  const { setDismissed } = useMessage();
  const icons = useIcons('message');

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
      className={classNames(ComponentClassNames.MessageDismiss, className)}
      ref={ref}
      onClick={dismissMessage}
      {...rest}
    >
      {hasIcon ? icons?.close ?? <IconClose aria-hidden="true" /> : null}
      {/* 
        Developers may include children content for Message.Dismiss, in which case
        we should not show our accessibly hidden label.
      */}
      {children ? (
        children
      ) : (
        <VisuallyHidden>
          {dismissLabel ? dismissLabel : ComponentText.Message.dismissLabel}
        </VisuallyHidden>
      )}
    </Button>
  );
};

export const MessageDismiss: ForwardRefPrimitive<
  BaseMessageDismissProps,
  'button'
> = React.forwardRef(MessageDismissPrimitive);

MessageDismiss.displayName = 'MessageContent';
