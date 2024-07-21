import React from 'react';
import { StorageBrowserElements } from '../../context/elements';

const { Icon, Text, Button } = StorageBrowserElements;

export interface MessageControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<T, 'Icon' | 'Text' | 'Button'> {
  (): React.JSX.Element;
}

export const MessageControl: MessageControl = () => {
  return <>Message</>;
};

MessageControl.Icon = Icon;
MessageControl.Text = Text;
MessageControl.Button = Button;
