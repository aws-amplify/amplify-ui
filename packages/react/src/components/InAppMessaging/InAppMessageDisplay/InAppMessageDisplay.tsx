import React from 'react';

import {
  handleMessageAction,
  OnMessageAction,
  useMessage,
} from '@aws-amplify/ui-react-core-notifications';

import { ThemeProvider } from '../../ThemeProvider';

import { BannerMessage } from '../BannerMessage';
import { FullScreenMessage } from '../FullScreenMessage';
import { ModalMessage } from '../ModalMessage';

import handleMessageLinkAction from './handleMessageLinkAction';
import { InAppMessageDisplayProps, MessageDefaultComponents } from './types';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

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
  useDeprecationWarning({
    shouldWarn: true,
    message:
      'The `InAppMessageDisplay` component has been migrated to `@aws-amplify/ui-react-notifications` and will be removed from this package in a future major release. Please install `@aws-amplify/ui-react-notifications` and update the import path.',
  });
  const components = React.useMemo(
    () => ({ ...platformComponents, ...overrideComponents }),
    [overrideComponents]
  );
  const { Component, props } = useMessage({
    components,
    onMessageAction,
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
