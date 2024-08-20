import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';
import type { OmitElements } from '../types';

const { View } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__empty-message`;

export interface _EmptyMessageControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<T, 'View'> {
  (): React.JSX.Element;
}

export interface EmptyMessageControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<_EmptyMessageControl<T>, 'View'> {
  (): React.JSX.Element;
}

export const EmptyMessageControl: EmptyMessageControl = () => (
  <View className={BLOCK_NAME} variant="empty-message">
    No items to show.
  </View>
);
