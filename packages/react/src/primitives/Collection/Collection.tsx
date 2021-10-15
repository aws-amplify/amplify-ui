import debounce from 'lodash/debounce';
import { useCallback, useState } from 'react';
import { Flex } from '../Flex';
import { Grid } from '../Grid';
import { Pagination, usePagination } from '../Pagination';
import { SearchField } from '../SearchField';
import { strHasLength } from '../shared/utils';
import {
  CollectionProps,
  GridCollectionProps,
  ListCollectionProps,
} from '../types';
import { getItemsAtPage, itemHasText } from './utils';

const DEFAULT_PAGE_SIZE = 10;
const TYPEAHEAD_DELAY_MS = 300;

const ListCollection = <Item,>({
  children,
  items,
  ...rest
}: ListCollectionProps<Item>) => (
  <Flex {...rest}>{Array.isArray(items) && items.map(children)}</Flex>
);

const GridCollection = <Item,>({
  children,
  items,
  ...rest
}: GridCollectionProps<Item>) => (
  <Grid {...rest}>{Array.isArray(items) && items.map(children)}</Grid>
);

export const Collection = <Item,>({
  isSearchable,
  isPaginated,
  items,
  itemsPerPage = DEFAULT_PAGE_SIZE,
  searchFilter = itemHasText,
  searchPlaceholder,
  type = 'list',
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
    totalPages: Math.floor(items.length / itemsPerPage),
  });

  if (isPaginated) {
    items = getItemsAtPage(items, pagination.currentPage, itemsPerPage);
  }

  const collection =
    type === 'list' ? (
      <ListCollection items={items} {...rest} />
    ) : type === 'grid' ? (
      <GridCollection items={items} {...rest} />
    ) : null;

  if (!isSearchable && !isPaginated) {
    return collection;
  }

  return (
    <Flex direction="column">
      {isSearchable && (
        <Flex direction="row" justifyContent="center">
          <SearchField
            size="small"
            label="Search"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch(e.target.value)}
            onClear={() => setSearchText('')}
          />
        </Flex>
      )}

      {collection}

      {isPaginated && (
        <Flex justifyContent="center">
          <Pagination {...pagination} />
        </Flex>
      )}
    </Flex>
  );
};
