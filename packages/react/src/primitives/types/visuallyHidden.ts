import { ElementType, PrimitiveProps, BaseViewProps } from './view';

// VisuallyHidden should not support style props
// @TODO change to extending the following type once `[key: string]: any` has been removed:
// type ViewPropsMinusStyleProps = Omit<ViewProps, keyof BaseStyleProps>;
// ref: https://app.asana.com/0/1200141963577341/1200985244607786/f
export interface BaseVisuallyHiddenProps extends BaseViewProps {}

export type VisuallyHiddenProps<Element extends ElementType = 'span'> =
  PrimitiveProps<BaseVisuallyHiddenProps, Element>;
