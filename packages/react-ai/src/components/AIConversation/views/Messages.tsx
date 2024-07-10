import React from 'react';
import { ActionsBar } from './ActionsBar';
import { Avatar } from './Avatar';
import { MessageLayout } from './MessageLayout';
import { Message } from './Message';
import { MessagesContainer } from './MessagesContainer';

interface ImageContent {
  format: 'png' | 'jpeg' | 'gif' | 'webp';
  bytes: ArrayBuffer;
}

type Content = {
  type: 'text' | 'image';
  value: string | ImageContent;
};

type Message = {
  id: string;
  content: Content;
  role: 'user' | 'assistant';
  timestamp: Date;
};

export function Messages({ messages }: { messages: Message[] }): JSX.Element {
  return (
    <MessagesContainer>
      {messages.map((message, index) => (
        <MessageLayout key={index}>
          <Avatar />
          <Message key={index} />
          <ActionsBar actions={[]} />
        </MessageLayout>
      ))}
    </MessagesContainer>
  );
}

Messages.ActionsBar = ActionsBar;
Messages.Avatar = Avatar;
Messages.MessagesContainer = MessagesContainer;
Messages.Layout = MessageLayout;
Messages.Message = Message;
