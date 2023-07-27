import React from 'react';
import { Sizes } from './base';
import { ElementType, PrimitiveProps, BaseViewProps } from './view';
import { LinkOptions } from './link';

/** @deprecated For internal use only */
export interface BaseBreadcrumbProps extends BaseViewProps {
  /**
   * @description
   * The size property will affect the font size of the breadcrumbs.
   */
  size?: Sizes;
  separator?: React.ReactNode;
  children?: React.ReactNode;
}

export interface BaseBreadcrumbItemProps extends BaseViewProps {
  isCurrent?: boolean;
  isDisabled?: boolean;
}

export interface BaseBreadcrumbLinkProps extends LinkOptions {
  isCurrent?: boolean;
  isDisabled?: boolean;
}

/**
 * Should work with NextJS routing and react-router
 * both render an a tag,
 * NextLink can passHref to child
 * react-router cannot and uses `to` prop
 */

export type BreadcrumbProps<Element extends ElementType = 'nav'> =
  PrimitiveProps<BaseBreadcrumbProps, Element>;

export type BreadcrumbItemProps<Element extends ElementType = 'li'> =
  PrimitiveProps<BaseBreadcrumbItemProps, Element>;

export type BreadcrumbLinkProps<Element extends ElementType = 'a'> =
  PrimitiveProps<BaseBreadcrumbLinkProps, Element>;
