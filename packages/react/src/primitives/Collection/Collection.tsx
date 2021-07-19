import classNames from 'classnames';
import { ComponentClassNames } from '../shared';
import {
  CollectionProps,
  CollectionDisplayTypeMap,
  CollectionDisplayType,
} from '../types';
import { Flex } from '../Flex';

const getCollectionWrapper = (type: CollectionDisplayType) => {
  switch (type) {
    case CollectionDisplayTypeMap.LIST:
      return Flex;
    case CollectionDisplayTypeMap.GRID:
    case CollectionDisplayTypeMap.TABLE:
    default:
      return Flex;
  }
};

export const Collection = <CardCollectionType,>({
  items,
  children,
  className,
  direction,
  type,
  ...rest
}: CollectionProps<CardCollectionType>): JSX.Element => {
  const CollectionWrapper = getCollectionWrapper(type);

  return (
    <CollectionWrapper
      direction={direction ?? 'column'}
      className={classNames(ComponentClassNames.Collection, className)}
      {...rest}
    >
      {items.map(children)}
    </CollectionWrapper>
  );
};
