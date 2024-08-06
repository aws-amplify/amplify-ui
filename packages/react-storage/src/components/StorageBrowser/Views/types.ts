import React from 'react';
import { StorageBrowserElements } from '../context/elements';

export type CommonControl = 'Message' | 'Table' | 'Title';

export type OmitElements<T, K extends string = never> = Omit<
  T,
  keyof StorageBrowserElements | K
>;

export interface ViewComponent<C> {
  (): React.JSX.Element;
  Controls: C;
}
