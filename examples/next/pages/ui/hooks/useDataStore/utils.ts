import { DataStore } from 'aws-amplify';
import { User, UserPreference } from './models';

export const initializeTestData = async (): Promise<void> => {
  await DataStore.save(
    new User({ firstName: 'Super', lastName: 'User3', age: 30 })
  );
  await DataStore.save(
    new User({ firstName: 'Admin', lastName: 'User2', age: 70 })
  );
  await DataStore.save(
    new User({ firstName: 'Generic', lastName: 'User1', age: 50 })
  );
  await DataStore.save(
    new User({ firstName: 'Toddler', lastName: 'User0', age: 5 })
  );
  await DataStore.save(new UserPreference({ favoriteColor: 'rgb(0, 0, 255)' }));
};

export const userFilterPredicate = {
  and: [
    { field: 'age', operand: '10', operator: 'gt' },
    { field: 'lastName', operand: 'U', operator: 'beginsWith' },
  ],
};

export const colorFilterPredicate = {
  field: 'favoriteColor',
  operand: 'rgb(0, 0, 255)',
  operator: 'eq',
};
