import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import type { OmitElements } from '../types';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Icon, View } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__loading`;

export interface _LoadingControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Spinner: T['Icon'];
  Text: T['View'];
}

export interface LoadingControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<_LoadingControl<T>, 'Spinner' | 'Text'> {
  (): React.JSX.Element;
}

const Container = withBaseElementProps(View, {
  className: BLOCK_NAME,
});

const LoadingIcon = withBaseElementProps(Icon, {
  className: `${BLOCK_NAME}__icon`,
  variant: 'loading',
});

const LoadingText = withBaseElementProps(View, {
  className: `${BLOCK_NAME}__text`,
  children: 'Loading...',
});

export const LoadingControl: LoadingControl = () => (
  <Container>
    <LoadingIcon />
    <LoadingText />
  </Container>
);
