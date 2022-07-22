import React from 'react';

import {
  handleMessageAction,
  OnMessageAction,
  useMessage,
} from '@aws-amplify/ui-react-core';

import handleMessageLinkAction from './handleMessageLinkAction';
import { InAppMessageDisplayProps, MessageDefaultComponents } from './types';

// TODO: replace below components incrementally as they become available
function BannerMessage<P>(_: P) {
  return null;
}
function CarouselMessage<P>(_: P) {
  return null;
}
function FullScreenMessage<P>(_: P) {
  return null;
}
function ModalMessage<P>(_: P) {
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

export default function InAppMessageDisplay({
  components: overrideComponents,
  styles,
}: InAppMessageDisplayProps): JSX.Element {
  const components = React.useMemo(
    () => ({ ...platformComponents, ...overrideComponents }),
    [overrideComponents]
  );
  const { Component, props } = useMessage({
    components,
    onMessageAction,
    styles,
  });

  return <Component {...props} />;
}
