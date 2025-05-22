import type { FlexContainerStyleProps } from './flex';
import type { BaseSelectProps } from './select';
import type { BaseFieldProps } from './field';
import type { ElementType, PrimitiveProps } from './view';

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
