import type { DefaultActionViewsByActionName, PrimaryViews } from '../types';

export interface PrimaryViewsContextType<T = string> {
  primary: PrimaryViews<T>;
}

export interface ActionViewsContextType<T = {}> {
  action: DefaultActionViewsByActionName & T;
}

export interface ViewsContextType<TPrimaryView = string, TActionView = {}>
  extends PrimaryViewsContextType<TPrimaryView>,
    ActionViewsContextType<TActionView> {}
