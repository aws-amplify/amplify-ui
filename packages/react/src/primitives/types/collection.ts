import { FlexProps } from './flex';
import { GridProps } from './grid';
import { BaseStyleProps } from './style';

export type CollectionType = 'list' | 'grid' | 'table';

export interface CollectionWrapperProps extends BaseStyleProps {
  /**
   * Collection type. This will be used to determine collection wrapper component.
   * @default 'list'
   */
  type?: CollectionType;

  /**
   * Enable pagination for collection items
   */
  isPaginated?: boolean;

  /**
   * Page size (when pagination is enabled)
   */
  itemsPerPage?: number;

  /**
   * Enable collection filtering
   */
  isSearchable?: boolean;

  /**
   * Custom search filter (when search is enabled)
   */
  searchFilter?: (item: unknown, searchText: string) => boolean;

  /**
   * Search field label
   * @default "Search"
   */
  searchLabel?: string;

  /**
   * Search field placeholder
   */
  searchPlaceholder?: string;
}

export interface CollectionBaseProps<Item> {
  /*
   * Data source. Items to be repeated over the collection.
   */
  items: Array<Item>;

  /*
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
