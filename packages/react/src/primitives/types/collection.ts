import { AriaProps, BaseComponentProps } from './base';
import { FlexStyleProps } from './flex';
import { BaseStyleProps } from './style';

export type CollectionDisplayType = 'list' | 'grid' | 'table';

interface CollectionDisplayTypeMapInterface {
  [key: string]: CollectionDisplayType;
}

export const CollectionDisplayTypeMap: CollectionDisplayTypeMapInterface = {
  LIST: 'list',
  GRID: 'grid',
  TABLE: 'table',
};

export interface CollectionProps<CollectionType>
  extends BaseComponentProps,
    AriaProps,
    BaseStyleProps,
    FlexStyleProps {
  display: CollectionDisplayType;

  items: Array<CollectionType>;

  /*
   * The component to be repeated
   * Same interface as Array.prototype.map
   */
  children: (item: CollectionType, index: number) => JSX.Element;
}
