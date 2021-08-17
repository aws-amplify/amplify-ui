import { AriaProps, BaseComponentProps } from './base';
import { FlexStyleProps } from './flex';
import { BaseStyleProps } from './style';
export declare type CollectionType = 'list' | 'grid' | 'table';
export interface CollectionTypeMapInterface {
  [key: string]: CollectionType;
}
export declare const CollectionTypeMap: CollectionTypeMapInterface;
export interface CollectionBaseProps<CollectionItemType>
  extends BaseComponentProps,
    AriaProps,
    BaseStyleProps {
  type?: CollectionType;
  items: Array<CollectionItemType>;
  children: (item: CollectionItemType, index: number) => JSX.Element;
}
export declare type ListCollectionProps<CollectionType> =
  CollectionBaseProps<CollectionType> &
    FlexStyleProps & {
      type: 'list';
    };
export declare type CollectionProps<CollectionType> =
  ListCollectionProps<CollectionType>;
