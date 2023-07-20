import { Sizes } from './base';
import { ElementType, PrimitiveProps, BaseViewProps } from './view';

export type BadgeVariations = 'info' | 'error' | 'warning' | 'success';
export type BadgeSizes = Sizes;

/** @deprecated For internal use only */
export interface BaseBreadcrumbProps extends BaseViewProps {
  /**
   * @description
   * The size property will affect the font size of the breadcrumbs.
   */
  size?: Sizes;
  separator?: React.ReactNode;
}

/**
 * Should work with NextJS routing and react-router
 * both render an a tag,
 * NextLink can passHref to child
 * react-router cannot and uses `to` prop
 */

export type BreadcrumbProps<Element extends ElementType = 'nav'> =
  PrimitiveProps<BaseBreadcrumbProps, Element>;

export type BreadcrumbItemProps<Element extends ElementType = 'a'> =
  PrimitiveProps<{} & BaseViewProps, Element>;
