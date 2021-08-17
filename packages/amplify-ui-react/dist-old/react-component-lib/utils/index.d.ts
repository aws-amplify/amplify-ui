import React from 'react';
export declare const dashToPascalCase: (str: string) => string;
export interface ReactProps {
  class?: string;
}
export declare type IonicReactExternalProps<PropType, ElementType> = PropType &
  React.HTMLAttributes<ElementType> &
  ReactProps;
export declare const createForwardRef: <PropType, ElementType>(
  ReactComponent: any,
  displayName: string
) => React.ForwardRefExoticComponent<
  React.PropsWithoutRef<
    PropType & React.HTMLAttributes<ElementType> & ReactProps
  > &
    React.RefAttributes<ElementType>
>;
export * from './attachEventProps';
