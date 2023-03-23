import type { ModelInit, MutableModel } from '@aws-amplify/datastore';

export type TodoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
};

export class Todo {
  readonly id!: string;
  readonly name: string;
  readonly description?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Todo, TodoMetaData>) {
    this.name = init.name;
  }
  static copyOf(
    source: Todo,
    mutator: (
      draft: MutableModel<Todo, TodoMetaData>
    ) => MutableModel<Todo, TodoMetaData> | void
  ): Todo {
    const copy = { ...source };
    mutator(copy);
    return copy;
  }
}
