import React from 'react';
import { InAppMessagingProvider } from '@aws-amplify/ui-react-core';

import { InAppMessageDisplay, MessageComponents } from '../InAppMessageDisplay';

export default function withInAppMessaging<Props>(
  Component: (props: Props) => JSX.Element,
  options?: { components?: MessageComponents }
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
