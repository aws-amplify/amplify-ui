import React from 'react';
import { StorageBrowserElements } from '../context/elements';
import { Controls } from './Controls';

export type CommonControl = 'Message' | 'Navigate' | 'Title';

export type OmitElements<T, K extends string = never> = Omit<
  T,
  keyof StorageBrowserElements | K
>;

export interface ViewComponent<T extends StorageBrowserElements, C> {
  (): React.JSX.Element;
  Controls: C;
  Table: Controls<T>['Table'];
  Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
}
