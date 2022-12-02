import * as React from 'react';
import {
  createDataStorePredicate,
  useDataStoreBinding,
} from '@aws-amplify/ui-react/internal';
import { SortDirection, SortPredicate } from '@aws-amplify/datastore';
import { Collection, Flex, Text } from '@aws-amplify/ui-react';

import { User } from '../models';
import { userFilterPredicate } from '../utils';

const userFilter = createDataStorePredicate(userFilterPredicate);
const userPagination = {
  sort: (s: SortPredicate<User>) => s.lastName(SortDirection.ASCENDING),
};

const CollectionWithSort = () => {
  const usersDataStore = useDataStoreBinding({
    type: 'collection',
    model: User,
    criteria: userFilter,
    pagination: userPagination,
  }).items;

  return (
    <Flex>
      <Collection type="list" isPaginated={true} items={usersDataStore ?? []}>
        {(item: User, index) => (
          <Text key={index} data-testid="sorted-item">
            {item.lastName ?? 'Test'}
          </Text>
        )}
      </Collection>
    </Flex>
  );
};

export default CollectionWithSort;
