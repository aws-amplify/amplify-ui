import {
  ModelInit,
  MutableModel,
  PersistentModelConstructor,
} from '@aws-amplify/datastore';

type TodoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
};

export declare class Todo {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly price: number;
  readonly count: number;
  readonly completed: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Todo, TodoMetaData>);
  static copyOf(
    source: Todo,
    mutator: (
      draft: MutableModel<Todo, TodoMetaData>
    ) => MutableModel<Todo, TodoMetaData> | void
  ): Todo;
}
