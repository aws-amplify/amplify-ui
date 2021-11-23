import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { useCallback, useState } from 'react';
import { Flex } from '../Flex';
import { Grid } from '../Grid';
import { Pagination, usePagination } from '../Pagination';
import { SearchField } from '../SearchField';
import { ComponentClassNames } from '../shared/constants';
import { SharedText } from '../shared/i18n';
import { strHasLength } from '../shared/utils';
import {
  CollectionProps,
  GridCollectionProps,
  ListCollectionProps,
} from '../types';
import { getItemsAtPage, itemHasText, getPageCount } from './utils';

const DEFAULT_PAGE_SIZE = 10;
const TYPEAHEAD_DELAY_MS = 300;

const ListCollection = <Item,>({
  children,
  direction = 'column',
  items,
  ...rest
}: ListCollectionProps<Item>) => (
  <Flex direction={direction} {...rest}>
    {Array.isArray(items) ? items.map(children) : null}
  </Flex>
);

const GridCollection = <Item,>({
  children,
  items,
  ...rest
}: GridCollectionProps<Item>) => (
  <Grid {...rest}>{Array.isArray(items) ? items.map(children) : null}</Grid>
);

export const Collection = <Item,>({
  className,
  isSearchable,
  isPaginated,
  items,
  itemsPerPage = DEFAULT_PAGE_SIZE,
  searchFilter = itemHasText,
  searchPlaceholder,
  type = 'list',
  testId,
  ...rest
}: CollectionProps<Item>): JSX.Element => {
  const [searchText, setSearchText] = useState<string>();

  const onSearch = useCallback(debounce(setSearchText, TYPEAHEAD_DELAY_MS), [
    setSearchText,
  ]);

  // Make sure that items are iterable
  items = Array.isArray(items) ? items : [];

  // Filter items by text
  if (isSearchable && strHasLength(searchText)) {
    items = items.filter((item) => searchFilter(item, searchText));
  }

  // Pagination
  const pagination = usePagination({
    totalPages: getPageCount(items.length, itemsPerPage),
  });

  if (isPaginated) {
    items = getItemsAtPage(items, pagination.currentPage, itemsPerPage);
  }

  const collection =
    type === 'list' ? (
      <ListCollection
        className={ComponentClassNames.CollectionItems}
        items={items}
        {...rest}
      />
    ) : type === 'grid' ? (
      <GridCollection
        className={ComponentClassNames.CollectionItems}
        items={items}
        {...rest}
      />
    ) : null;

  return (
    <Flex
      testId={testId}
      className={classNames(ComponentClassNames.Collection, className)}
    >
      {isSearchable ? (
        <Flex className={ComponentClassNames.CollectionSearch}>
          <SearchField
            label={SharedText.Collection.SearchFieldLabel}
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch(e.target.value)}
            onClear={() => setSearchText('')}
          />
        </Flex>
      ) : null}

      {collection}

      {isPaginated ? (
        <Flex className={ComponentClassNames.CollectionPagination}>
          <Pagination {...pagination} />
        </Flex>
      ) : null}
    </Flex>
  );
};

Collection.displayName = 'Collection';
