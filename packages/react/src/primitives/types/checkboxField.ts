import { BaseCheckboxProps } from './checkbox';
import { BaseFieldProps } from './field';
import { ElementType, PrimitiveProps } from './view';

export interface BaseCheckboxFieldProps
  extends BaseCheckboxProps,
    BaseFieldProps {}

export type CheckboxFieldProps<Element extends ElementType = 'input'> =
  PrimitiveProps<BaseCheckboxFieldProps, Element>;
