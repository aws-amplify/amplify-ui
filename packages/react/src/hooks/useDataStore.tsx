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
 *
 * @param props object containing params for calling either calling Datastore.query or Datastore.observeQuery
 * @returns the result of either calling Datastore.query or Datastore.observeQuery for the provided props
 */
function useDataStoreResult<Model extends PersistentModel>(
  props:
    | DataStoreBindingProps<Model, 'record'>
    | DataStoreBindingProps<Model, 'collection'>
): DataStoreItemResult<Model> | DataStoreCollectionResult<Model> {
  const isRecord = props.type === 'record';

  const [isLoading, setIsLoading] =
    React.useState<
      (
        | DataStoreItemResult<Model>
        | DataStoreCollectionResult<Model>
      )['isLoading']
    >(false);
  const [error, setError] = React.useState<Error>();
  const [items, setItems] = React.useState<
    // use DataStoreCollectionResult for both 'record' and 'collection' types
    DataStoreCollectionResult<Model>['items']
  >([]);

  const hasRan = React.useRef(false);
  React.useEffect(() => {
    if (hasRan.current) {
      return;
    }

    setIsLoading(true);
    // set to true to prevent additional Datastore call on re-render
    hasRan.current = true;

    if (isRecord) {
      // call DataStore.query for single record
      const { id, model } = props as any;
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
        (error) => {
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
  }, [isRecord, props]);

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
  model,
  criteria,
  pagination,
}: DataStoreCollectionProps<M>): DataStoreCollectionResult<M> =>
  useDataStoreResult({
    criteria,
    model,
    pagination,
    type: 'collection',
  }) as DataStoreCollectionResult<M>;

/**
 * Perform a single record query against a DataStore model
 * @internal
 */
export const useDataStoreItem = <M extends PersistentModel>({
  model,
  id,
}: DataStoreItemProps<M>): DataStoreItemResult<M> =>
  useDataStoreResult({ id, model, type: 'record' });

/**
 * Perform a query against a DataStore model
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
  return useDataStoreResult(props);
}
