import React from 'react';

import { SpanElement, ViewElement } from '../../context/elements/definitions';
import { IconElement } from '../../context/elements/IconElement';

import { CLASS_BASE } from '../constants';

const BLOCK_NAME = `${CLASS_BASE}__loading`;

export const LoadingControl = (): React.JSX.Element => (
  <ViewElement className={BLOCK_NAME}>
    <IconElement className={`${BLOCK_NAME}__icon`} variant="loading" />
    <SpanElement className={`${BLOCK_NAME}__text`} aria-live="polite">
      Loading
    </SpanElement>
  </ViewElement>
);
