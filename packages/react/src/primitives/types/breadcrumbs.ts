import type * as React from 'react';
import type { ElementType, PrimitiveProps, BaseViewProps } from './view';
import type { BaseLinkProps } from './link';

export interface BaseBreadcrumbsProps extends BaseViewProps {
  /**
   * @description
   * Separator between breadcrumb items
   */
  separator?: React.ReactNode;
  /**
   * @description
   * Array of breadcrumb items to render
   */
  items?: Array<{
    href?: string;
    label?: React.ReactNode;
    isCurrent?: boolean;
  }>;
}

export interface BaseBreadcrumbItemProps extends BaseViewProps { }

export interface BaseBreadcrumbLinkProps extends BaseLinkProps {
  isCurrent?: boolean;
}

export interface BaseBreadcrumbSeparatorProps extends BaseViewProps { }

export interface BaseBreadcrumbContainerProps extends BaseViewProps { }

/**
 * Should work with NextJS routing and react-router
 * both render an a tag,
 * NextLink can passHref to child
 * react-router cannot and uses `to` prop
 */

export type BreadcrumbsProps<Element extends ElementType = 'nav'> =
  PrimitiveProps<BaseBreadcrumbsProps, Element>;

export type BreadcrumbsItemProps<Element extends ElementType = 'li'> =
  PrimitiveProps<BaseBreadcrumbItemProps, Element>;

export type BreadcrumbsLinkProps<Element extends ElementType = 'a'> =
  PrimitiveProps<BaseBreadcrumbLinkProps, Element>;

export type BreadcrumbsSeparatorProps<Element extends ElementType = 'span'> =
  PrimitiveProps<BaseBreadcrumbSeparatorProps, Element>;

export type BreadcrumbsContainerProps<Element extends ElementType = 'nav'> =
  PrimitiveProps<BaseBreadcrumbContainerProps, Element>;
