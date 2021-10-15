import {
  PersistentModel,
  PersistentModelConstructor,
  ProducerModelPredicate,
  ProducerPaginationInput,
} from '@aws-amplify/datastore';

export type DataStoreItemProps<M extends PersistentModel> = {
  model: PersistentModelConstructor<M>;
  id: string;
};

export type DataStoreCollectionProps<M extends PersistentModel> = {
  model: PersistentModelConstructor<M>;
  criteria?: ProducerModelPredicate<M>;
  pagination?: ProducerPaginationInput<M>;
};

type DataStoreBaseResult = {
  error: Error;
  fetch: () => void;
  isLoading: boolean;
};

export type DataStoreItemResult<M extends PersistentModel> =
  DataStoreBaseResult & { item?: M };

export type DataStoreCollectionResult<M extends PersistentModel> =
  DataStoreBaseResult & { items: M[] };

export type DataStoreQueryProps<M extends PersistentModel, T extends string> = {
  type: T;
} & (T extends 'record'
  ? DataStoreItemProps<M>
  : T extends 'collection'
  ? DataStoreCollectionProps<M>
  : never);
