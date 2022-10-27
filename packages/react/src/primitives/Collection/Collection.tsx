import classNames from 'classnames';
import debounce from 'lodash/debounce';
import * as React from 'react';

import { Flex } from '../Flex';
import { Grid } from '../Grid';
import { Text } from '../Text';
import { Pagination, usePagination } from '../Pagination';
import { SearchField } from '../SearchField';
import { ComponentClassNames, ComponentText } from '../shared/constants';
import { strHasLength } from '../shared/utils';
import {
  CollectionProps,
  GridCollectionProps,
  ListCollectionProps,
  Primitive,
} from '../types';
import { getItemsAtPage, itemHasText, getPageCount } from './utils';

const DEFAULT_PAGE_SIZE = 10;
const TYPEAHEAD_DELAY_MS = 300;

const ListCollection: Primitive<ListCollectionProps<unknown>, 'div'> = (
  { children, direction = 'column', items, ...rest },
  ref
) => (
  <Flex ref={ref} direction={direction} {...rest}>
    {Array.isArray(items) ? items.map(children) : null}
  </Flex>
);

const ListCollectionWithRef = React.forwardRef(ListCollection);

const GridCollection: Primitive<GridCollectionProps<unknown>, 'div'> = (
  { children, items, ...rest },
  ref
) => (
  <Grid ref={ref} {...rest}>
    {Array.isArray(items) ? items.map(children) : null}
  </Grid>
);

const GridCollectionWithRef = React.forwardRef(GridCollection);

const renderCollectionOrNoResultsFound = <Item,>(
  collection: JSX.Element,
  items: Item[],
  searchNoResultsFound: React.ReactNode
) => {
  if (items.length) {
    return collection;
  }
  if (searchNoResultsFound) {
    return searchNoResultsFound;
  }
  return (
    <Flex justifyContent="center">
      <Text>{ComponentText.Collection.searchNoResultsFound}</Text>
    </Flex>
  );
};

const CollectionPrimitive: Primitive<CollectionProps<any>, 'div'> = (
  {
    className,
    isSearchable,
    isPaginated,
    items,
    itemsPerPage = DEFAULT_PAGE_SIZE,
    searchFilter = itemHasText,
    searchLabel = ComponentText.Collection.searchButtonLabel,
    searchNoResultsFound,
    searchPlaceholder,
    type = 'list',
    testId,
    ...rest
  },
  ref
) => {
  const [searchText, setSearchText] = React.useState<string>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearch = React.useCallback(
    debounce(setSearchText, TYPEAHEAD_DELAY_MS),
    [setSearchText]
  );

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
      <ListCollectionWithRef
        className={ComponentClassNames.CollectionItems}
        items={items}
        ref={ref}
        {...rest}
      />
    ) : type === 'grid' ? (
      <GridCollectionWithRef
        className={ComponentClassNames.CollectionItems}
        items={items}
        ref={ref}
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
            label={searchLabel}
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch(e.target.value)}
            onClear={() => setSearchText('')}
          />
        </Flex>
      ) : null}

      {renderCollectionOrNoResultsFound(
        collection,
        items,
        searchNoResultsFound
      )}

      {isPaginated ? (
        <Flex className={ComponentClassNames.CollectionPagination}>
          <Pagination {...pagination} />
        </Flex>
      ) : null}
    </Flex>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/collection)
 */
export const Collection = React.forwardRef(CollectionPrimitive);
Collection.displayName = 'Collection';
