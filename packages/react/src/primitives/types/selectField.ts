import { FlexContainerStyleProps } from './flex';
import { BaseSelectProps } from './select';
import { BaseFieldProps } from './field';
import { ElementType, PrimitivePropsWithRef } from './view';

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
  PrimitivePropsWithRef<BaseSelectFieldProps, Element>;
