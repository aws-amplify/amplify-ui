import React from 'react';
import { Icon } from '@aws-amplify/ui-react';

export const ExternalLinkIcon = (): JSX.Element | null => (
  <Icon
    ariaLabel={'external-link'}
    paths={[
      {
        d: 'M19 14l1.83-1.83a2 2 0 10-2.83-2.83L13 15M5 10l-1.83 1.83a2 2 0 102.83 2.83L11 9',
        fillRule: 'evenodd',
      },
    ]}
  />
);

ExternalLinkIcon.displayName = 'ExternalLinkIcon';
