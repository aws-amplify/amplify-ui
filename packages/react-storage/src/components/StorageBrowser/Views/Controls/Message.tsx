import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';

const { Button, Icon, View } = StorageBrowserElements;

const BLOCK_NAME = `message`;

export interface MessageControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (props: {}): React.JSX.Element;
  Icon: T['Icon'];
  Container: T['View'];
  Text: T['View'];
  // Button: T['Button'];
}

const Container = withBaseElementProps(View, {
  className: `${BLOCK_NAME}`,
  role: 'alert',
});

const InfoIcon = withBaseElementProps(Icon, {
  'aria-hidden': true,
  children: (
    <path
      d="M12 21.0004C16.9706 21.0004 21 16.9709 21 12.0004H24C24 18.6278 18.6274 24.0004 12 24.0004C5.37258 24.0004 0 18.6278 0 12.0004C0 5.37295 5.37258 0.000371044 11.9873 0.000424673C15.4955 -0.0292413 18.7704 1.497 21 4.06355V0.000371044H24V9.00037H15V6.00037H18.7082C17.0452 4.10448 14.6122 2.97832 12 3.00037C7.02944 3.00037 3 7.02981 3 12.0004C3 16.9709 7.02944 21.0004 12 21.0004Z"
      fill="currentColor"
    />
  ),
  className: `${BLOCK_NAME}__icon`,
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
});

export const MessageControl: MessageControl = () => (
  <Container>
    <InfoIcon />
  </Container>
);

MessageControl.Container = Container;
MessageControl.Icon = InfoIcon;
