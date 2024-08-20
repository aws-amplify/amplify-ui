import React from 'react';

import type { OmitElements } from '../types';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Icon, Span, View } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__loading`;

interface LoadingControlProps {
  loadingText?: string | undefined;
}

export interface _LoadingControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<T, 'Icon' | 'Span' | 'View'> {
  ({ loadingText }: LoadingControlProps): React.JSX.Element;
}

export interface LoadingControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<_LoadingControl<T>, 'Icon' | 'Text' | 'View'> {
  ({ loadingText }: LoadingControlProps): React.JSX.Element;
}

export const LoadingControl: LoadingControl = ({ loadingText }) => (
  <View className={BLOCK_NAME}>
    <Icon className={`${BLOCK_NAME}__icon`} variant="loading" />
    <Span className={`${BLOCK_NAME}__text`} aria-live="polite">
      {loadingText ?? 'Loading'}
    </Span>
  </View>
);
