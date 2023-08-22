import * as React from 'react';

import { BaseViewProps } from './view';
import { FlexContainerStyleProps } from './flex';
import { ElementType, PrimitiveProps } from './view';

/** @deprecated For internal use only */
export interface BaseFieldsetProps
  extends BaseViewProps,
    FlexContainerStyleProps {
  /**
   * @description
   * Legend is the label for the fieldset.
   */
  legend: React.ReactNode;

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

  variation?: 'outlined' | 'plain';

  size?: 'small' | 'large';

  /**
   * @description
   *  Determines whether field should be disabled.
   * @default
   * false
   */
  isDisabled?: boolean;

  /**
   * @description
   * Name of the fieldset.
   */
  name?: string;

  /**
   * @description
   * Form to associate the fieldset with
   */
  form?: string;
}

export type FieldsetProps<Element extends ElementType = 'fieldset'> =
  PrimitiveProps<BaseFieldsetProps, Element>;
