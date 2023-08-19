import {
  ElementType,
  PrimitiveProps,
  BaseViewProps,
  ViewProps,
} from '../../types';

export type InternalIcon = (
  props: ViewProps & {
    size?: string | number;
  }
) => JSX.Element;

export interface BaseInternalIconProps extends BaseViewProps {
  size?: string | number;
}

export type InternalIconProps<Element extends ElementType = 'span'> =
  PrimitiveProps<BaseInternalIconProps, Element>;
