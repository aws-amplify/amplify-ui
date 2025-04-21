import React from 'react';

import type { OnMessageAction } from '@aws-amplify/ui-react-core-notifications';
import {
  handleMessageAction,
  useMessage,
} from '@aws-amplify/ui-react-core-notifications';
import { ThemeProvider } from '@aws-amplify/ui-react';
import { useSetUserAgent } from '@aws-amplify/ui-react-core';

import { BannerMessage } from '../BannerMessage';
import { FullScreenMessage } from '../FullScreenMessage';
import { ModalMessage } from '../ModalMessage';

import handleMessageLinkAction from './handleMessageLinkAction';
import type {
  InAppMessageDisplayProps,
  MessageDefaultComponents,
} from './types';
import { VERSION } from '../../../version';

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
}: InAppMessageDisplayProps): React.JSX.Element {
  const components = React.useMemo(
    () => ({ ...platformComponents, ...overrideComponents }),
    [overrideComponents]
  );
  const { Component, props } = useMessage({
    components,
    onMessageAction,
  });

  useSetUserAgent({
    componentName: 'InAppMessaging',
    packageName: 'react-notifications',
    version: VERSION,
  });

  // There is currently no way to pass In-App Message payload variants so we
  // will fix the theme around In-App Messaging components to always assume
  // light mode
  return (
    <ThemeProvider colorMode="light">
      <Component {...props} />
    </ThemeProvider>
  );
}

InAppMessageDisplay.BannerMessage = BannerMessage;
InAppMessageDisplay.CarouselMessage = CarouselMessage;
InAppMessageDisplay.FullScreenMessage = FullScreenMessage;
InAppMessageDisplay.ModalMessage = ModalMessage;

export default InAppMessageDisplay;
