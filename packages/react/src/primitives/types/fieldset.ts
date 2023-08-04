import * as React from 'react';

import { BaseFlexProps } from './flex';
import { ElementType, PrimitiveProps } from './view';

/** @deprecated For internal use only */
export interface BaseFieldsetProps extends BaseFlexProps {
  /**
   * @description
   * Legend is the label for the fieldset.
   */
  legend?: React.ReactNode;

  /**
   * @description
   * Visually hides the label while making it still accessible to screenreaders.
   */
  legendHidden?: boolean;

  /**
   * @description
   * Renders the fieldset horizontally
   */
  isHorizontal?: boolean;

  variation?: 'outlined';

  size?: 'small' | 'large';

  /**
   * @description
   *  Determines whether field should be disabled.
   * @default
   * false
   */
  isDisabled?: boolean;
}

export type FieldsetProps<Element extends ElementType = 'fieldset'> =
  PrimitiveProps<BaseFieldsetProps, Element>;
