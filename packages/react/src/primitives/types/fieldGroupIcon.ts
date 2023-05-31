import { ElementType, PrimitivePropsWithRef, BaseViewProps } from './view';
import { BaseButtonProps } from './button';

export interface BaseFieldGroupIconProps extends BaseViewProps {
  /**
   * @description
   * Determines whether Icon should be visible
   */
  isVisible?: boolean;

  /**
   * @description
   * Determines whether element should be focusable.
   * When set to false, tabindex="-1" will be set
   */
  excludeFromTabOrder?: boolean;
}
export type FieldGroupIconProps<
  Element extends ElementType = 'button' | 'div'
> = PrimitivePropsWithRef<BaseFieldGroupIconProps, Element>;

export interface BaseFieldGroupIconButtonProps
  extends BaseFieldGroupIconProps,
    Pick<BaseButtonProps, 'onClick' | 'variation' | 'size' | 'type'> {}

export type FieldGroupIconButtonProps<Element extends ElementType = 'button'> =
  PrimitivePropsWithRef<BaseFieldGroupIconButtonProps, Element>;
