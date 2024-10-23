import React from 'react';

export interface DataListProps<T> {
  data?: T[];
  renderItem?: (item: T, index: number) => React.JSX.Element;
}

export type WithKey<T> = { key: string } & T;
