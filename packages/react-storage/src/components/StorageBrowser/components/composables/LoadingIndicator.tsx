import React from 'react';

import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../base';
import { IconElement, SpanElement, ViewElement } from '../elements';

export interface LoadingIndicatorProps {
  label?: string;
  isLoading?: boolean;
}
export function LoadingIndicator({
  label,
  isLoading,
}: LoadingIndicatorProps): React.JSX.Element | null {
  return !isLoading ? null : (
    <ViewElement
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__loading-indicator`}
    >
      <IconElement
        className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__loading-indicator-icon`}
        variant="loading"
      />
      <SpanElement
        className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__loading-indicator-label`}
        aria-live="polite"
      >
        {label}
      </SpanElement>
    </ViewElement>
  );
}
