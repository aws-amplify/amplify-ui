import React from 'react';

import { IconElement, SpanElement, ViewElement } from '../context/elements';

import { CLASS_BASE } from '../views/constants';

export interface LoadingIndicatorProps {
  label?: string;
  isLoading?: boolean;
}
export function LoadingIndicator({
  label,
  isLoading,
}: LoadingIndicatorProps): React.JSX.Element | null {
  return !isLoading ? null : (
    <ViewElement className={`${CLASS_BASE}__loading-indicator`}>
      <IconElement
        className={`${CLASS_BASE}__loading-indicator-icon`}
        variant="loading"
      />
      <SpanElement
        className={`${CLASS_BASE}__loading-indicator-text`}
        aria-live="polite"
      >
        {label}
      </SpanElement>
    </ViewElement>
  );
}
