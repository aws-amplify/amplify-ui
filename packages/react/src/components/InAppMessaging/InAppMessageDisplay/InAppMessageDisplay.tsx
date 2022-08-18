import React from 'react';

import {
  handleMessageAction,
  OnMessageAction,
  useMessage,
} from '@aws-amplify/ui-react-core';

import { BannerMessage } from '../BannerMessage';
import { FullScreenMessage } from '../FullScreenMessage';
import { ModalMessage } from '../ModalMessage';

import handleMessageLinkAction from './handleMessageLinkAction';
import { InAppMessageDisplayProps, MessageDefaultComponents } from './types';

// TODO: replace below components incrementally as they become available
function CarouselMessage<P>(_: P) {
  return null;
}

const platformComponents: MessageDefaultComponents = {
  BannerMessage,
  CarouselMessage,
  FullScreenMessage,
  ModalMessage,
};

const onMessageAction: OnMessageAction = ({ action, url }) => {
  handleMessageAction({
    action,
    url,
    handleMessageLinkAction,
  });
};

function InAppMessageDisplay({
  components: overrideComponents,
}: InAppMessageDisplayProps): JSX.Element {
  const components = React.useMemo(
    () => ({ ...platformComponents, ...overrideComponents }),
    [overrideComponents]
  );
  const { Component, props } = useMessage({
    components,
    onMessageAction,
  });

  return <Component {...props} />;
}

InAppMessageDisplay.BannerMessage = BannerMessage;
InAppMessageDisplay.CarouselMessage = CarouselMessage;
InAppMessageDisplay.FullScreenMessage = FullScreenMessage;
InAppMessageDisplay.ModalMessage = ModalMessage;

export default InAppMessageDisplay;
