import {
  PersistentModel,
  PersistentModelConstructor,
  ProducerModelPredicate,
  ProducerPaginationInput,
} from '@aws-amplify/datastore';

export type DataStoreItemProps<Model extends PersistentModel> = {
  model: PersistentModelConstructor<Model>;
  id: string;
};

export type DataStoreCollectionProps<Model extends PersistentModel> = {
  model: PersistentModelConstructor<Model>;
  criteria?: ProducerModelPredicate<Model>;
  pagination?: ProducerPaginationInput<Model>;
};

type DataStoreBaseResult = {
  error?: Error;
  isLoading: boolean;
};

export type DataStoreItemResult<Model extends PersistentModel> =
  DataStoreBaseResult & { item?: Model };

export type DataStoreCollectionResult<Model extends PersistentModel> =
  DataStoreBaseResult & { items: Model[] };

export type DataStoreBindingProps<
  Model extends PersistentModel,
  BindingType extends 'record' | 'collection'
> = {
  type: BindingType;
} & (BindingType extends 'record'
  ? DataStoreItemProps<Model>
  : BindingType extends 'collection'
  ? DataStoreCollectionProps<Model>
  : never);

export type DataStorePredicateObject = {
  and?: DataStorePredicateObject[];
  or?: DataStorePredicateObject[];
  field?: string;
  operand?: string;
  operator?: string;
};
