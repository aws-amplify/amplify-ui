import { CollectionProps } from '../types';
export declare const Collection: <CollectionItemType>({
  items,
  children,
  className,
  direction,
  type,
  ...rest
}: CollectionProps<CollectionItemType>) => JSX.Element;
