import { FlexContainerStyleProps } from './flex';
import { BaseSelectProps } from './select';
import { BaseFieldProps } from './field';
import { ElementType, PrimitiveProps } from './view';

/** @deprecated For internal use only */
export interface BaseSelectFieldProps
  extends BaseFieldProps,
    FlexContainerStyleProps,
    BaseSelectProps {
  /**
   * @description
   * List of option values for select dropdown
   */
  options?: string[];
}

export type SelectFieldProps<Element extends ElementType = 'select'> =
  PrimitiveProps<BaseSelectFieldProps, Element>;
