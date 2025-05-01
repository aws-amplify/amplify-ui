import type * as React from 'react';

import type { Sizes } from './base';
import type { BaseViewProps } from './view';
import type { FlexContainerStyleProps } from './flex';
import type { ElementType, PrimitiveProps } from './view';

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
   * Visually hides the legend while making it still accessible to screenreaders.
   */
  legendHidden?: boolean;

  /**
   * @description
   * Adds plain or outlined variation to the Fieldset
   */
  variation?: 'plain' | 'outlined';

  /**
   * @description
   * Changes the size of the Fieldset
   */
  size?: Sizes;

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
