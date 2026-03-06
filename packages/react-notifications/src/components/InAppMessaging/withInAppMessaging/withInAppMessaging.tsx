import React from 'react';
import { InAppMessagingProvider } from '@aws-amplify/ui-react-core-notifications';

import type { MessageComponents } from '../InAppMessageDisplay';
import { InAppMessageDisplay } from '../InAppMessageDisplay';

export default function withInAppMessaging<Props = {}>(
  Component: React.ComponentType<Props>,
  options?: { components?: MessageComponents }
): (props: Props) => React.JSX.Element {
  return function WrappedWithInAppMessaging(props: Props) {
    return (
      <InAppMessagingProvider>
        <InAppMessageDisplay {...options} />
        <Component {...(props as Props & React.JSX.IntrinsicAttributes)} />
      </InAppMessagingProvider>
    );
  };
}
