import React from 'react';
import { MessageMediaContent } from './MessageMediaContent';
import { MessageTextContent } from './MessageTextContent';

export function Message(): JSX.Element {
  const isText = true;
  return isText ? <MessageTextContent /> : <MessageMediaContent />;
}

Message.MediaContent = MessageMediaContent;
Message.TextContent = MessageTextContent;
