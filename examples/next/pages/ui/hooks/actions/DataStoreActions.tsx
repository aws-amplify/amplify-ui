import * as React from 'react';

import { Hub } from 'aws-amplify';
import {
  TextField,
  Button,
  Collection,
  Flex,
  View,
} from '@aws-amplify/ui-react';
import {
  useDataStoreCollection,
  useDataStoreCreateAction,
  useDataStoreDeleteAction,
  useDataStoreUpdateAction,
} from '@aws-amplify/ui-react/internal';

import { Todo } from './models';

export const DataStoreTodoForm = () => {
  const [toDoName, setToDoName] = React.useState<string>('');

  const createTodoAction = useDataStoreCreateAction({
    model: Todo,
    fields: { name: toDoName },
  });
  const todos = useDataStoreCollection({ model: Todo });

  const onInput = (e: any) => {
    const { value } = e.target;
    setToDoName(value);
  };

  return (
    <View maxWidth="400px">
      <h2>Shopping list:</h2>
      <TextField
        name="createTodo"
        label="ToDo"
        labelHidden
        onInput={onInput}
        value={toDoName}
      />
      <Button
        onClick={async () => {
          await createTodoAction();
          setToDoName('');
        }}
      >
        Save
      </Button>
      <Collection
        type="list"
        as="ul"
        items={todos.items}
        isDisabled={todos.isLoading}
      >
        {(todo, key) => <TodoItem key={key} todo={todo} />}
      </Collection>
    </View>
  );
};

const TodoItem = ({ todo }: { todo: Todo }) => {
  const [showEdit, setShowEdit] = React.useState(false);
  const [todoName, setToDoName] = React.useState(todo.name);

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };

  const deleteTodoAction = useDataStoreDeleteAction({
    model: Todo,
    id: todo.id,
  });

  const updateTodoAction = useDataStoreUpdateAction({
    model: Todo,
    id: todo.id,
    fields: { name: todoName },
  });

  return (
    <Flex as="li" key={todo.id}>
      {showEdit ? (
        <Flex>
          <TextField
            label="Update todo"
            labelHidden
            value={todoName}
            width="100%"
            onChange={(e: any) => {
              setToDoName(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              updateTodoAction();
              toggleEdit();
            }}
          >
            Update
          </Button>
          <Button
            onClick={() => {
              setToDoName('');
            }}
          >
            Clear
          </Button>
        </Flex>
      ) : (
        <Button isFullWidth variation="link" onClick={toggleEdit}>
          {todo.name}
        </Button>
      )}
      <Button onClick={() => deleteTodoAction()}>Delete</Button>
    </Flex>
  );
};

Hub.listen('ui-actions', (data) => {
  if (data.source == 'DataStoreCreate' && data.payload.event === 'Started') {
    alert('Creating...');
  }
});
