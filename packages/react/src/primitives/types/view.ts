import { AriaProps, BaseComponentProps } from './base';
import { BaseStyleProps } from './style';
import * as React from 'react';

export interface ViewProps
  extends BaseComponentProps,
    BaseStyleProps,
    AriaProps {
  as?: React.ElementType;

  isDisabled?: boolean;

  style?: React.CSSProperties;
}
