import React from 'react';

import { IconElement, SpanElement, ViewElement } from '../context/elements';

import { CLASS_BASE } from '../views/constants';

export const LoadingIndicator = (): React.JSX.Element => (
  <ViewElement className={`${CLASS_BASE}__loading-indicator`}>
    <IconElement
      className={`${CLASS_BASE}__loading-indicator-icon`}
      variant="loading"
    />
    <SpanElement
      className={`${CLASS_BASE}__loading-indicator-text`}
      aria-live="polite"
    >
      Loading
    </SpanElement>
  </ViewElement>
);
