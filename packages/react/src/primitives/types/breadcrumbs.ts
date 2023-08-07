import * as React from 'react';
import { ElementType, PrimitiveProps, BaseViewProps } from './view';
import { BaseLinkProps } from './link';

/** @deprecated For internal use only */
export interface BaseBreadcrumbProps extends BaseViewProps {
  /**
   * @description
   * Separator between breadcrumb items
   */
  separator?: React.ReactNode;
}

export interface BaseBreadcrumbItemProps extends BaseViewProps {
  isCurrent?: boolean;
}

export interface BaseBreadcrumbLinkProps extends BaseLinkProps {}

/**
 * Should work with NextJS routing and react-router
 * both render an a tag,
 * NextLink can passHref to child
 * react-router cannot and uses `to` prop
 */

export type BreadcrumbsProps<Element extends ElementType = 'nav'> =
  PrimitiveProps<BaseBreadcrumbProps, Element>;

export type BreadcrumbsItemProps<Element extends ElementType = 'li'> =
  PrimitiveProps<BaseBreadcrumbItemProps, Element>;

export type BreadcrumbsLinkProps<Element extends ElementType = 'a'> =
  PrimitiveProps<BaseBreadcrumbLinkProps, Element>;
