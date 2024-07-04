import React from 'react';
import { ViewElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../context/elements';
import { MessageTextContent } from './MessageTextContent';
import { MessageMediaContent } from './MessageMediaContent';

export const MessageElement = <T extends ViewElementProps>({
  children,
  className,
  ...rest
}: T): JSX.Element => {
  const View = useElement('View');

  return (
    <View className={className} {...rest}>
      {children}
    </View>
  );
};

const Message = Object.assign(MessageElement, {
  MessageTextContent,
  MessageMediaContent,
});

export { Message };
