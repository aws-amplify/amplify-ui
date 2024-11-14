import React from 'react';

import { SpanElement, ViewElement } from '../../context/elements/definitions';
import { IconElement } from '../../context/elements/IconElement';

import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../../constants';

export const LoadingControl = (): React.JSX.Element => (
  <ViewElement
    className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__loading-indicator`}
  >
    <IconElement
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__loading-indicator-icon`}
      variant="loading"
    />
    <SpanElement
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__loading-indicator-text`}
      aria-live="polite"
    >
      Loading
    </SpanElement>
  </ViewElement>
);
