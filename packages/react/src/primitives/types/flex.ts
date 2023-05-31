import { Property } from 'csstype';

import { CSSLayoutStyleProps, ResponsiveStyle } from './style';
import { BaseViewProps, PrimitiveProps, ElementType } from './view';

export interface FlexContainerStyleProps extends CSSLayoutStyleProps {
  /**
   * @description
   * Sets how flex items are placed in the flex container defining the main axis
   * and the direction (normal or reversed). (maps to flex-direction CSS property)
   */
  direction?: ResponsiveStyle<Property.FlexDirection>;

  /**
   * @description
   * The flexWrap property is set on containers and it controls what happens when
   * children overflow the size of the container along the main axis. By default,
   * children are forced into a single line (which can shrink elements). If
   * wrapping is allowed, items are wrapped into multiple lines along the main
   * axis if needed.
   * (maps to flex-wrap CSS property)
   */
  wrap?: ResponsiveStyle<Property.FlexWrap>;
}

export interface BaseFlexProps extends BaseViewProps, FlexContainerStyleProps {}

export type FlexProps<Element extends ElementType = 'div'> = PrimitiveProps<
  BaseFlexProps,
  Element
>;

export interface FlexItemStyleProps {
  /**
   * @description
   * Shorthand for flex grow / shrink / basis
   */
  flex?: ResponsiveStyle<Property.Flex>;

  /**
   * @description
   * Sets the order to lay out an item in a flex or grid container.
   */
  order?: ResponsiveStyle<Property.Order>;

  /**
   * @description
   * Ability for flex item to grow
   */
  grow?: ResponsiveStyle<Property.FlexGrow>;

  /**
   * @description
   * Ability for flex item to shrink
   */
  shrink?: ResponsiveStyle<Property.FlexShrink>;

  /**
   * @description
   * Default size of element before remaining space is distributed
   */
  basis?: ResponsiveStyle<Property.FlexBasis>;
}
