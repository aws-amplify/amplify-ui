import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Icon, Text, Button, View } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__message`;

export interface MessageControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<T, 'View' | 'Icon' | 'Text' | 'Button'> {
  (): React.JSX.Element;
}

const Container = withBaseElementProps(
  View,
  ({ className = `${BLOCK_NAME}__item`, ...props }) => ({ ...props, className })
);

export const MessageControl: MessageControl = () => {
  return <Container></Container>;
};

MessageControl.View = Container;
MessageControl.Icon = Icon;
MessageControl.Text = Text;
MessageControl.Button = Button;
