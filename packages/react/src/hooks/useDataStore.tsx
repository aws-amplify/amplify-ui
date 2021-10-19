import { DataStore, PersistentModel } from '@aws-amplify/datastore';
import { useEffect, useState } from 'react';
import {
  DataStoreBindingProps,
  DataStoreCollectionProps,
  DataStoreCollectionResult,
  DataStoreItemProps,
  DataStoreItemResult,
} from '../primitives/types/datastore';

/**
 * Perform a collection query against a DataStore model
 */
export const useDataStoreCollection = <M extends PersistentModel>({
  model,
  criteria,
  pagination,
}: DataStoreCollectionProps<M>): DataStoreCollectionResult<M> => {
  const [items, setItems] = useState<M[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const fetch = () => {
    setLoading(true);

    DataStore.query(model, criteria, pagination)
      .then(setItems)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  // Fetch on next render cycle
  useEffect(fetch, []);

  return {
    error,
    fetch,
    items,
    isLoading,
  };
};

/**
 * Perform a single record query against a DataStore model
 */
export const useDataStoreItem = <M extends PersistentModel>({
  model,
  id,
}: DataStoreItemProps<M>): DataStoreItemResult<M> => {
  const [item, setItem] = useState<M>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const fetch = () => {
    setLoading(true);

    DataStore.query(model, id)
      .then(setItem)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  // Fetch on next render cycle
  useEffect(fetch, []);

  return {
    error,
    fetch,
    item,
    isLoading,
  };
};

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
  return props.type === 'record'
    ? useDataStoreItem(props)
    : useDataStoreCollection(props);
}
