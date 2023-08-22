import * as React from 'react';

import { BaseViewProps } from './view';
import { FlexContainerStyleProps } from './flex';
import { ElementType, PrimitiveProps } from './view';

export type FieldsetVariation = 'outlined' | 'plain';

/** @deprecated For internal use only */
export interface BaseFieldsetProps
  extends BaseViewProps,
    FlexContainerStyleProps {
  /**
   * @description
   * Legend is the label for the Fieldset.
   */
  legend: React.ReactNode;

  /**
   * @description
   * Visually hides the label while making it still accessible to screenreaders.
   */
  legendHidden?: boolean;

  /**
   * @description
   * Adds plain or outlined variation to the Fieldset
   */
  variation?: FieldsetVariation;

  size?: 'small' | 'large';

  /**
   * @description
   *  Determines whether the Fieldset should be disabled.
   * @default
   * false
   */
  isDisabled?: boolean;

  /**
   * @description
   * Name of the Fieldset.
   */
  name?: string;

  /**
   * @description
   * Form to associate the Fieldset with
   */
  form?: string;
}

export type FieldsetProps<Element extends ElementType = 'fieldset'> =
  PrimitiveProps<BaseFieldsetProps, Element>;
