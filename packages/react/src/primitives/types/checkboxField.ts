import { BaseCheckboxProps } from './checkbox';
import { BaseFieldProps } from './field';
import { ElementType, PrimitiveProps } from './view';

/** @deprecated For internal use only */
export interface BaseCheckboxFieldProps
  extends BaseCheckboxProps,
    BaseFieldProps {}

export type CheckboxFieldProps<Element extends ElementType = 'input'> =
  PrimitiveProps<BaseCheckboxFieldProps, Element>;
