import * as React from 'react';
import { User } from '../models';
import {
  createDataStorePredicate,
  getOverrideProps,
  useDataStoreBinding,
} from '@aws-amplify/ui-react/internal';
import { SortDirection } from '@aws-amplify/datastore';
import { Collection, Flex, Text } from '@aws-amplify/ui-react';
import { userFilterPredicate } from '../utils';

const CollectionWithSort = (props) => {
  const { backgroundColor, items, overrideItems, overrides, ...rest } = props;

  const userFilter = createDataStorePredicate(userFilterPredicate);
  const userPagination = {
    sort: (s) => s.lastName(SortDirection.ASCENDING),
  };
  const usersDataStore = useDataStoreBinding({
    type: 'collection',
    model: User,
    criteria: userFilter,
    pagination: userPagination,
  }).items;
  const users = items !== undefined ? items : usersDataStore;

  return (
    <Flex>
      <Collection
        type="list"
        isPaginated={true}
        backgroundColor={backgroundColor}
        items={users || []}
        {...rest}
        {...getOverrideProps(overrides, 'CollectionWithSort')}
      >
        {(item: User, index) => (
          <Text key={index} data-testid="sorted-item">
            {item.lastName || 'Test'}
          </Text>
        )}
      </Collection>
    </Flex>
  );
};

export default CollectionWithSort;
