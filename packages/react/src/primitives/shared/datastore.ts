import {
  ModelPredicate,
  PersistentModel,
  ProducerModelPredicate,
} from '@aws-amplify/datastore';
import { DataStorePredicateObject } from '../types/datastore';
import { isFunction } from './utils';

/**
 * Given an array of predicates, compose them in sequential order
 */
const mergePredicates = <Model extends PersistentModel>(
  predicates: ProducerModelPredicate<Model>[]
): ProducerModelPredicate<Model> =>
  predicates.reduce(
    (previous, current) => (predicate) => current(previous(predicate)),
    (predicate) => predicate
  );

/**
 * Creates a DataStore compatible predicate function from an object representation
 * @internal
 */
export const createDataStorePredicate = <Model extends PersistentModel>(
  predicateObject: DataStorePredicateObject
): ProducerModelPredicate<Model> => {
  const {
    and: groupAnd,
    or: groupOr,
    field,
    operator,
    operand,
  } = predicateObject;

  if (Array.isArray(groupAnd)) {
    const predicates = groupAnd.map((condition) =>
      createDataStorePredicate<Model>(condition)
    );

    return (p: ModelPredicate<Model>) => p.and(mergePredicates(predicates));
  } else if (Array.isArray(groupOr)) {
    const predicates = groupOr.map((condition) =>
      createDataStorePredicate<Model>(condition)
    );

    return (p: ModelPredicate<Model>) => p.or(mergePredicates(predicates));
  }

  return (predicate: ModelPredicate<Model>) => {
    if (isFunction(predicate[field])) {
      return predicate[field].call(predicate, operator, operand);
    }

    return predicate;
  };
};
