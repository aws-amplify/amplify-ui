import React from 'react';

import { IconElement, SpanElement, ViewElement } from '../context/elements';
import { STORAGE_BROWSER_BLOCK } from '../constants';

export const LoadingIndicator = (): React.JSX.Element => (
  <ViewElement className={`${STORAGE_BROWSER_BLOCK}__loading-indicator`}>
    <IconElement
      className={`${STORAGE_BROWSER_BLOCK}__loading-indicator-icon`}
      variant="loading"
    />
    <SpanElement
      className={`${STORAGE_BROWSER_BLOCK}__loading-indicator-text`}
      aria-live="polite"
    >
      Loading
    </SpanElement>
  </ViewElement>
);
