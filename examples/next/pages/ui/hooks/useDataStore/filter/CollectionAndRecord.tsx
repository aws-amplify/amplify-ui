import * as React from 'react';
import { User, UserPreference } from '../models';
import {
  createDataStorePredicate,
  getOverrideProps,
  useDataStoreBinding,
} from '@aws-amplify/ui-react/internal';
import { Button, Collection, Flex } from '@aws-amplify/ui-react';
import { colorFilterPredicate, userFilterPredicate } from '../utils';

const CollectionAndRecord = (props) => {
  const {
    backgroundColor,
    buttonColor: buttonColorProp,
    items,
    overrideItems,
    overrides,
    ...rest
  } = props;

  const userFilter = createDataStorePredicate(userFilterPredicate);
  const usersDataStore = useDataStoreBinding({
    criteria: userFilter,
    model: User,
    type: 'collection',
  }).items;
  const users = items !== undefined ? items : usersDataStore;

  const colorFilter = createDataStorePredicate(colorFilterPredicate);
  const colorDataStore = useDataStoreBinding({
    type: 'collection',
    model: UserPreference,
    criteria: colorFilter,
  }).items[0];
  const buttonColor =
    buttonColorProp !== undefined ? buttonColorProp : colorDataStore;

  return (
    <Flex>
      <Collection
        type="list"
        isPaginated={true}
        backgroundColor={backgroundColor}
        items={users || []}
        {...rest}
        {...getOverrideProps(overrides, 'CollectionWithBinding')}
      >
        {(item: User, index) => (
          <Button
            data-testid="filtered-item"
            backgroundColor={buttonColor?.favoriteColor}
            {...(overrideItems && overrideItems({ item, index }))}
          >
            {item.firstName || 'Test'}
          </Button>
        )}
      </Collection>
    </Flex>
  );
};

export default CollectionAndRecord;
