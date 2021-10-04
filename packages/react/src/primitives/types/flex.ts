import { Property } from 'csstype';

import { CSSLayoutStyleProps, ResponsiveStyle } from './style';
import { ViewProps } from './view';

export interface FlexContainerStyleProps extends CSSLayoutStyleProps {
  /**
   * Sets how flex items are placed in the flex container defining the main axis
   * and the direction (normal or reversed). (maps to flex-direction CSS property)
   */
  direction?: ResponsiveStyle<Property.FlexDirection>;

  /**
   * The flexWrap property is set on containers and it controls what happens when
   * children overflow the size of the container along the main axis. By default,
   * children are forced into a single line (which can shrink elements). If
   * wrapping is allowed, items are wrapped into multiple lines along the main
   * axis if needed.
   * (maps to flex-wrap CSS property)
   */
  wrap?: ResponsiveStyle<Property.FlexWrap>;
}

export interface FlexProps extends ViewProps, FlexContainerStyleProps {}

export interface FlexItemStyleProps {
  /**
   * Shorthand for flex grow / shrink / basis
   */
  flex?: ResponsiveStyle<Property.Flex>;

  /**
   * Controls order flex items appear
   */
  order?: ResponsiveStyle<Property.Order>;

  /**
   * Ability for flex item to grow
   */
  grow?: ResponsiveStyle<Property.FlexGrow>;

  /**
   * Ability for flex item to shrink
   */
  shrink?: ResponsiveStyle<Property.FlexShrink>;

  /**
   * Default size of element before remaining space is distributed
   */
  basis?: ResponsiveStyle<Property.FlexBasis>;
}
