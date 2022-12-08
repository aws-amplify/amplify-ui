import * as React from 'react';
import {
  createDataStorePredicate,
  useDataStoreBinding,
} from '@aws-amplify/ui-react/internal';
import { Button, Collection, Flex } from '@aws-amplify/ui-react';

import { User, UserPreference } from '../models';
import { colorFilterPredicate, userFilterPredicate } from '../utils';

const userFilter = createDataStorePredicate(userFilterPredicate);
const colorFilter = createDataStorePredicate(colorFilterPredicate);

const CollectionAndRecord = () => {
  const usersDataStore = useDataStoreBinding({
    criteria: userFilter,
    model: User,
    type: 'collection',
  }).items;

  const colorDataStore = useDataStoreBinding({
    type: 'collection',
    model: UserPreference,
    criteria: colorFilter,
  }).items[0];

  return (
    <Flex>
      <Collection type="list" isPaginated={true} items={usersDataStore ?? []}>
        {(item: User, index) => (
          <Button
            key={index}
            data-testid="filtered-item"
            backgroundColor={colorDataStore?.favoriteColor}
          >
            {item.firstName ?? 'Test'}
          </Button>
        )}
      </Collection>
    </Flex>
  );
};

export default CollectionAndRecord;
