import React from 'react';
export declare const createReactComponent: <PropType, ElementType>(
  tagName: string
) => React.ForwardRefExoticComponent<
  React.PropsWithoutRef<
    PropType &
      React.HTMLAttributes<ElementType> &
      import('./utils/index').ReactProps
  > &
    React.RefAttributes<ElementType>
>;
