import * as React from 'react';

import { DataStore, PersistentModel } from '@aws-amplify/datastore';

import {
  DataStoreBindingProps,
  DataStoreCollectionProps,
  DataStoreCollectionResult,
  DataStoreItemProps,
  DataStoreItemResult,
} from '../primitives/types/datastore';

/**
 * Perform a query against a DataStore model
 * @param props object containing params for calling either calling Datastore.query or Datastore.observeQuery
 * @returns the result of either calling Datastore.query or Datastore.observeQuery for the provided props
 * @internal
 */
export function useDataStoreBinding<Model extends PersistentModel>(
  props: DataStoreBindingProps<Model, 'record'>
): DataStoreItemResult<Model>;
export function useDataStoreBinding<Model extends PersistentModel>(
  props: DataStoreBindingProps<Model, 'collection'>
): DataStoreCollectionResult<Model>;
export function useDataStoreBinding<Model extends PersistentModel>(
  props:
    | DataStoreBindingProps<Model, 'record'>
    | DataStoreBindingProps<Model, 'collection'>
): DataStoreItemResult<Model> | DataStoreCollectionResult<Model> {
  const isRecord = props.type === 'record';

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error>();
  const [items, setItems] = React.useState<
    // use DataStoreCollectionResult for both 'record' and 'collection' types
    DataStoreCollectionResult<Model>['items']
  >([]);

  // assign the function used to query DataStore to a ref to prevent it from being a dep of the useEffect it is
  // called in, ensuring that the useEffect dep array remains empty. This guarantees the useEffect only runs
  // once and that subecription.unsubscribe is not called between render cycles
  const queryRef = React.useRef(() => {
    if (isRecord) {
      // call DataStore.query for single record
      const { id, model } = props;
      DataStore.query<Model>(model, id)
        .then<void>((item) => {
          setItems([item]);
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // call DataStore.observeQuery for record collection
      const { criteria, model, pagination } = props;

      const subscription = DataStore.observeQuery(
        model,
        criteria,
        pagination
      ).subscribe(
        ({ items }) => {
          setItems(items);
          setIsLoading(false);
        },
        (error: Error) => {
          setError(error);
          setIsLoading(false);
        }
      );

      // Unsubscribe from query updates on unmount
      if (subscription) {
        return () => {
          subscription.unsubscribe();
        };
      }
    }
  });

  React.useEffect(() => queryRef.current(), []);

  return {
    ...(isRecord ? { item: items[0] } : { items }),
    error,
    isLoading,
  };
}

/**
 * Perform a collection query against a DataStore model
 * @internal
 */
export const useDataStoreCollection = <M extends PersistentModel>({
  criteria,
  model,
  pagination,
}: DataStoreCollectionProps<M>): DataStoreCollectionResult<M> =>
  useDataStoreBinding({
    criteria,
    model,
    pagination,
    type: 'collection',
  });

/**
 * Perform a single record query against a DataStore model
 * @internal
 */
export const useDataStoreItem = <M extends PersistentModel>({
  id,
  model,
}: DataStoreItemProps<M>): DataStoreItemResult<M> =>
  useDataStoreBinding({ id, model, type: 'record' });
