import { DataStore, PersistentModel } from '@aws-amplify/datastore';
import { useEffect, useState } from 'react';
import {
  DataStoreCollectionProps,
  DataStoreCollectionResult,
  DataStoreItemProps,
  DataStoreItemResult,
  DataStoreQueryProps,
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

  // Attempt fetch on next render cycle
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

  // Attempt fetch on next render cycle
  useEffect(fetch, []);

  return {
    error,
    fetch,
    item,
    isLoading,
  };
};

export function useDataStoreBinding<M extends PersistentModel>(
  props: { type: 'record' } & DataStoreItemProps<M>
): DataStoreItemResult<M>;
export function useDataStoreBinding<M extends PersistentModel>(
  props: { type: 'collection' } & DataStoreCollectionProps<M>
): DataStoreCollectionResult<M>;
export function useDataStoreBinding<M extends PersistentModel>(
  props: DataStoreQueryProps<M, 'record'> | DataStoreQueryProps<M, 'collection'>
): DataStoreItemResult<M> | DataStoreCollectionResult<M> {
  return props.type === 'record'
    ? useDataStoreItem(props)
    : useDataStoreCollection(props);
}
