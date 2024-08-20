import React from 'react';

import type { OmitElements } from '../types';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Icon, Span, View } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__loading`;

export interface _LoadingControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<T, 'Icon' | 'Span' | 'View'> {
  (): React.JSX.Element;
}

export interface LoadingControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<_LoadingControl<T>, 'Icon' | 'Text' | 'View'> {
  (): React.JSX.Element;
}

export const LoadingControl: LoadingControl = () => (
  <View className={BLOCK_NAME}>
    <Icon className={`${BLOCK_NAME}__icon`} variant="loading" />
    <Span className={`${BLOCK_NAME}__text`} aria-live="polite">
      Loading
    </Span>
  </View>
);
