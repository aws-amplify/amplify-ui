import {
  RecursiveModelPredicate,
  RecursiveModelPredicateAggregateExtender,
  RecursiveModelPredicateOperator,
  ValuePredicate,
} from '@aws-amplify/datastore';

import { DataStorePredicateObject } from '../../types/datastore';
import { createDataStorePredicate } from '../datastore';
import { PredicateInternalsKey } from '@aws-amplify/datastore';

type Post = { id: string; name: string; age: string };

const namePredicateObject = {
  field: 'name',
  operator: 'startsWith',
  operand: 'John',
};

const agePredicateObject = {
  field: 'age',
  operator: 'gt',
  operand: '25',
};

const booleanPredicateObject = {
  field: 'isActive',
  operator: 'eq',
  operand: true,
};

const agePredicate = jest.fn();
const booleanPredicate = jest.fn();
const namePredicate = jest.fn();

const baseCondition: Omit<
  RecursiveModelPredicate<Post>,
  'and' | 'or' | 'not'
> = {
  id: '' as unknown as ValuePredicate<Post, string>,
  name: '' as unknown as ValuePredicate<Post, string>,
  age: '' as unknown as ValuePredicate<Post, string>,
};

const ageCondition: RecursiveModelPredicate<Post> = {
  ...baseCondition,
  [agePredicateObject.field]: {
    [agePredicateObject.operator]: agePredicate,
  },
} as RecursiveModelPredicate<Post>;

const booleanCondition: RecursiveModelPredicate<Post> = {
  ...baseCondition,
  [booleanPredicateObject.field]: {
    [booleanPredicateObject.operator]: booleanPredicate,
  },
} as RecursiveModelPredicate<Post>;

const nameCondition: RecursiveModelPredicate<Post> = {
  ...baseCondition,
  [namePredicateObject.field]: {
    [namePredicateObject.operator]: namePredicate,
  },
} as RecursiveModelPredicate<Post>;

describe('createDataStorePredicate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should generate a simple predicate', () => {
    const predicate = createDataStorePredicate<Post>(namePredicateObject);

    predicate(nameCondition);
    expect(namePredicate).toHaveBeenCalledWith(namePredicateObject.operand);
  });

  test('should generate a simple boolean predicate', () => {
    const predicate = createDataStorePredicate<Post>(booleanPredicateObject);

    predicate(booleanCondition);
    expect(booleanPredicate).toHaveBeenCalledWith(
      booleanPredicateObject.operand
    );
  });

  test('should generate an `or` group predicate', () => {
    const predicateObject: DataStorePredicateObject = {
      or: [namePredicateObject, agePredicateObject],
    };

    const predicate = createDataStorePredicate<Post>(predicateObject);

    const or: RecursiveModelPredicateOperator<Post> = (p) =>
      [p(nameCondition), p(ageCondition)] as unknown as PredicateInternalsKey;

    const condition = {
      or,
    } as RecursiveModelPredicate<Post>;

    predicate(condition);

    expect(namePredicate).toHaveBeenCalledWith(namePredicateObject.operand);
    expect(agePredicate).toHaveBeenCalledWith(agePredicateObject.operand);
  });

  test('should generate an `and` group predicate', () => {
    const predicateObject: DataStorePredicateObject = {
      and: [namePredicateObject, agePredicateObject],
    };

    const predicate = createDataStorePredicate<Post>(predicateObject);

    const and: RecursiveModelPredicateOperator<Post> = (p) =>
      [p(nameCondition), p(ageCondition)] as unknown as PredicateInternalsKey;

    const condition = {
      and,
    } as RecursiveModelPredicate<Post>;

    predicate(condition);

    expect(namePredicate).toHaveBeenCalledWith(namePredicateObject.operand);
    expect(agePredicate).toHaveBeenCalledWith(agePredicateObject.operand);
  });

  test('should generate a nested predicate', () => {
    const predicateObject: DataStorePredicateObject = {
      and: [namePredicateObject, { or: [agePredicateObject] }],
    };

    const predicate = createDataStorePredicate<Post>(predicateObject);

    const or: RecursiveModelPredicateOperator<Post> = (orGroup) =>
      orGroup(ageCondition) as unknown as PredicateInternalsKey;

    const condition = {
      and: (andGroup: RecursiveModelPredicateAggregateExtender<Post>) =>
        andGroup({
          ...nameCondition,
          or,
        } as RecursiveModelPredicate<Post>),
    } as unknown as RecursiveModelPredicate<Post>;

    predicate(condition);

    expect(namePredicate).toHaveBeenCalledWith(namePredicateObject.operand);
    expect(agePredicate).toHaveBeenCalledWith(agePredicateObject.operand);
  });
});
