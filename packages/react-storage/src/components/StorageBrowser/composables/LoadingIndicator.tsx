import React from 'react';

import { IconElement, SpanElement, ViewElement } from '../context/elements';

import { CLASS_BASE } from '../views/constants';

const BLOCK_NAME = `${CLASS_BASE}__loading`;

export interface LoadingIndicatorProps {
  label?: string;
  isLoading?: boolean;
}
export function LoadingIndicator({
  label,
  isLoading,
}: LoadingIndicatorProps): React.JSX.Element | null {
  return !isLoading ? null : (
    <ViewElement className={BLOCK_NAME}>
      <IconElement className={`${BLOCK_NAME}__icon`} variant="loading" />
      <SpanElement className={`${BLOCK_NAME}__text`} aria-live="polite">
        {label}
      </SpanElement>
    </ViewElement>
  );
}
