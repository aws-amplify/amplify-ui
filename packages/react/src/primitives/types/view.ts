import { AriaProps, BaseComponentProps } from './base';
import { BaseStyleProps } from './style';
import React, { AriaRole } from 'react';

export type ViewAsHTMLElementTypes = keyof JSX.IntrinsicElements | React.FC;

export interface ViewProps
  extends BaseComponentProps,
    BaseStyleProps,
    AriaProps {
  as?: ViewAsHTMLElementTypes;

  role?: AriaRole;

  isDisabled?: boolean;
}
