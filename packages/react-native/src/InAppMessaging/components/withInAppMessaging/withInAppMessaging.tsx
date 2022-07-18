import React from 'react';
import { InAppMessagingProvider } from '@aws-amplify/ui-react-core';

import {
  InAppMessageDisplay,
  MessageComponents,
  MessageStyles,
} from '../InAppMessageDisplay';

export default function withInAppMessaging<Props>(
  Component: (props: Props) => JSX.Element,
  options?: { components?: MessageComponents; styles?: MessageStyles }
): (props: Props) => JSX.Element {
  return function WrappedWithInAppMessaging(props: Props) {
    return (
      <InAppMessagingProvider>
        <InAppMessageDisplay {...options} />
        <Component {...props} />
      </InAppMessagingProvider>
    );
  };
}
