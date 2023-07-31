import React from 'react';

export type MergeProps<C, P> = C & Omit<P, keyof C>;

export type AnyComponent = React.ComponentType<any>;
