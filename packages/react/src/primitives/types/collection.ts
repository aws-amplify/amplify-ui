import * as React from 'react';
import { FlexProps } from './flex';
import { GridProps } from './grid';
import { BaseStyleProps } from './style';
import { ElementType } from './view';

export type CollectionType = 'list' | 'grid' | 'table';

export interface CollectionWrapperProps extends BaseStyleProps {
  /**
   * @description
   * Changes the type of HTML element rendered
   */
  as?: ElementType;

  /**
   * @description
   * Collection type. This will be used to determine collection wrapper component.
   * @default
   * 'list'
   */
  type?: CollectionType;

  /**
   * @description
   * Enable pagination for collection items
   */
  isPaginated?: boolean;

  /**
   * @description
   * Page size (when pagination is enabled)
   */
  itemsPerPage?: number;

  /**
   * @description
   * Enable collection filtering
   */
  isSearchable?: boolean;

  /**
   * @description
   * Custom search filter (when search is enabled)
   */
  searchFilter?: (item: unknown, searchText: string) => boolean;

  /**
   * @description
   * Search field label
   * @default
   * "Search"
   */
  searchLabel?: string;

  /**
   * @description
   * Search field placeholder
   */
  searchPlaceholder?: string;

  /**
   * @description
   * Controls what is displayed when no results are found from the Collection search
   */
  searchNoResultsFound?: React.ReactNode;
}

export interface CollectionBaseProps<Item> {
  /**
   * @description
   * The items from a data source that will be mapped by the Collection component
   */
  items: Array<Item>;

  /**
   * @description
   * The component to be repeated
   * Same interface as Array.prototype.map
   */
  children: (item: Item, index: number) => JSX.Element;
}

// @TODO Add TableCollectionProps
export type ListCollectionProps<Item> = FlexProps & CollectionBaseProps<Item>;

export type GridCollectionProps<Item> = GridProps & CollectionBaseProps<Item>;

export type CollectionProps<Item> = CollectionWrapperProps &
  (
    | ({ type: 'list' } & ListCollectionProps<Item>)
    | ({ type: 'grid' } & GridCollectionProps<Item>)
  );
