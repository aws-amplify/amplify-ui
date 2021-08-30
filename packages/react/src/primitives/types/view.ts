import { AriaProps, BaseComponentProps } from './base';
import { BaseStyleProps } from './style';
import * as React from 'react';

export type ViewAsHTMLElementTypes =
  | keyof JSX.IntrinsicElements
  | React.ComponentType;

export interface ViewProps
  extends BaseComponentProps,
    BaseStyleProps,
    AriaProps {
  as?: ViewAsHTMLElementTypes;

  role?: React.AriaRole;

  isDisabled?: boolean;
}
