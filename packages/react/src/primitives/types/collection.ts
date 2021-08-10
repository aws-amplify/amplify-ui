import { AriaProps, BaseComponentProps } from './base';
import { FlexStyleProps } from './flex';
import { BaseStyleProps } from './style';

export type CollectionType = 'list' | 'grid' | 'table';

export interface CollectionTypeMapInterface {
  [key: string]: CollectionType;
}

export const CollectionTypeMap: CollectionTypeMapInterface = {
  LIST: 'list',
  GRID: 'grid',
  TABLE: 'table',
};

export interface CollectionBaseProps<CollectionItemType>
  extends BaseComponentProps,
    AriaProps,
    BaseStyleProps {
  /*
   * Collection type. This will be used to determine collection wrapper component.
   * @default 'list'
   */
  type?: CollectionType;

  /*
   * Data source. Items to be repeated over the collection.
   */
  items: Array<CollectionItemType>;

  /*
   * The component to be repeated
   * Same interface as Array.prototype.map
   */
  children: (item: CollectionItemType, index: number) => JSX.Element;
}

// @TODO Add GridCollectionProps and TableCollectionProps
export type ListCollectionProps<CollectionType> =
  CollectionBaseProps<CollectionType> & FlexStyleProps & { type: 'list' };

export type CollectionProps<CollectionType> =
  ListCollectionProps<CollectionType>;
