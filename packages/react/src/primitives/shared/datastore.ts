import {
  ModelPredicate,
  PersistentModel,
  ProducerModelPredicate,
} from '@aws-amplify/datastore';

export type DataStorePredicateObject = {
  and?: DataStorePredicateObject[];
  or?: DataStorePredicateObject[];
  field?: string;
  operand?: string;
  operator?: string;
};

const createPredicate = <Model extends PersistentModel>(
  predicateObject: DataStorePredicateObject,
  nextPredicate?: ProducerModelPredicate<Model>
): ProducerModelPredicate<Model> => {
  const {
    and: groupAnd,
    or: groupOr,
    field,
    operator,
    operand,
  } = predicateObject;

  if (Array.isArray(groupAnd)) {
    let nextPredicate: ProducerModelPredicate<Model>;

    groupAnd.forEach((condition) => {
      nextPredicate = createPredicate(condition, nextPredicate);
    });

    return (predicate: ModelPredicate<Model>) => predicate.and(nextPredicate);
  } else if (Array.isArray(groupOr)) {
    let nextPredicate: ProducerModelPredicate<Model>;

    groupOr.forEach((condition) => {
      nextPredicate = createPredicate(condition, nextPredicate);
    });

    return (predicate: ModelPredicate<Model>) => predicate.or(nextPredicate);
  } else {
    return (predicate: ModelPredicate<Model>) => {
      const current = nextPredicate ? nextPredicate(predicate) : predicate;
      return current[field].call(current, operator, operand);
    };
  }
};

export const createDataStorePredicate = <Model extends PersistentModel>(
  predicateObject: DataStorePredicateObject
): ProducerModelPredicate<Model> => {
  return createPredicate(predicateObject);
};
