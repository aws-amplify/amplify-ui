import { Property } from 'csstype';

import { BaseComponentProps } from "./base";

export interface FlexStyleProps {
  /**
   * Controls where the flex items sit on the cross axis.
   */
  alignItems?: Property.AlignItems;

  /**
  * Sets the distribution of space between and around content items
  */
  alignContent?: Property.AlignContent;

  /**
   * Sets how flex items are placed in the flex container defining the main axis
   * and the direction (normal or reversed). (maps to flex-direction CSS property)
   */
  direction?: Property.FlexDirection;

  /**
   * Spacing between child components
   */
  gap?: Property.Gap;

  /**
   * Controls where the flex items sit on the main axis.
   */
  justifyContent?: Property.JustifyContent;

  /**
   * The flexWrap property is set on containers and it controls what happens when
   * children overflow the size of the container along the main axis. By default,
   * children are forced into a single line (which can shrink elements). If
   * wrapping is allowed, items are wrapped into multiple lines along the main
   * axis if needed.
   * (maps to flex-wrap CSS property)
   */
  wrap?: Property.FlexWrap;
}

export interface FlexProps extends FlexStyleProps, BaseComponentProps { }
