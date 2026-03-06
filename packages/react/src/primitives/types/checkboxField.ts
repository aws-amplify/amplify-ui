import type { BaseCheckboxProps } from './checkbox';
import type { BaseFieldProps } from './field';
import type { ElementType, PrimitiveProps } from './view';

/** @deprecated For internal use only */
export interface BaseCheckboxFieldProps
  extends BaseCheckboxProps,
    BaseFieldProps {}

export type CheckboxFieldProps<Element extends ElementType = 'input'> =
  PrimitiveProps<BaseCheckboxFieldProps, Element>;
