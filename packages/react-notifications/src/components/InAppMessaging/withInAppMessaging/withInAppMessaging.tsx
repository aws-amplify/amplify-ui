import React from 'react';
import { InAppMessagingProvider } from '@aws-amplify/ui-react-core-notifications';

import { InAppMessageDisplay, MessageComponents } from '../InAppMessageDisplay';

export default function withInAppMessaging<Props = {}>(
  Component: React.ComponentType<Props>,
  options?: { components?: MessageComponents }
): (props: Props) => JSX.Element {
  return function WrappedWithInAppMessaging(props: Props) {
    return (
      <InAppMessagingProvider>
        <InAppMessageDisplay {...options} />
        <Component {...(props as Props & JSX.IntrinsicAttributes)} />
      </InAppMessagingProvider>
    );
  };
}
