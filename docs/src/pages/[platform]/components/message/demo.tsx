import * as React from 'react';
import { Message, MessageProps } from '@aws-amplify/ui-react';
import { Demo } from '@/components/Demo';
import { MessagePropControls } from './MessagePropControls';
import { useMessageProps } from './useMessageProps';
import { demoState } from '@/utils/demoState';
import { getPropString } from '../utils/getPropString';

const propsToCode = (props) => {
  return (
    `<Message` +
    getPropString(props.variation, 'variation') +
    getPropString(props.colorTheme, 'colorTheme') +
    getPropString(props.heading, 'heading') +
    `>` +
    `\n  ${props.children}` +
    `\n</Message>`
  );
};

const defaultMessageProps: MessageProps = {
  colorTheme: 'info',
  variation: 'filled',
  heading: 'A message heading',
  children: 'Basic message content',
  hasIcon: true,
  isDismissible: false,
};

export const MessageDemo = () => {
  const messageProps = useMessageProps(
    (demoState.get('TextField') as MessageProps) || defaultMessageProps
  );

  return (
    <Demo
      code={propsToCode(messageProps)}
      propControls={<MessagePropControls {...messageProps} />}
    >
      <Message
        variation={messageProps.variation}
        colorTheme={messageProps.colorTheme}
        heading={messageProps.heading}
        hasIcon={messageProps.hasIcon}
        isDismissible={messageProps.isDismissible}
      >
        {messageProps.children}
      </Message>
    </Demo>
  );
};
