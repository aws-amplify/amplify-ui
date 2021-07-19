import classNames from 'classnames';
import { ComponentClassNames } from '../shared';
import { CollectionProps } from '../types';
import { Flex } from '../Flex';

export const Collection = <CollectionItemType,>({
  items,
  children,
  className,
  direction,
  type = 'list',
  ...rest
}: CollectionProps<CollectionItemType>): JSX.Element => {
  return (
    <Flex
      direction={direction ?? 'column'}
      className={classNames(ComponentClassNames.Collection, className)}
      {...rest}
    >
      {items.map(children)}
    </Flex>
  );
};
