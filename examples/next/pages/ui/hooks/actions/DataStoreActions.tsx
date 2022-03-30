import * as React from 'react';

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
import { schema } from './models/schema';

export const DataStoreTodoForm = () => {
  const [toDoName, setToDoName] = React.useState<string>('');
  const [toDoCount, setToDoCount] = React.useState<string>('');
  const [toDoPrice, setToDoPrice] = React.useState<string>('');

  const createTodoAction = useDataStoreCreateAction({
    model: Todo,
    fields: { name: toDoName, price: toDoPrice, count: toDoCount },
    schema,
  });

  const todos = useDataStoreCollection({ model: Todo });

  const onNameInput = (e: any) => {
    const { value } = e.target;
    setToDoName(value);
  };
  const onCountInput = (e: any) => {
    const { value } = e.target;
    setToDoCount(value);
  };
  const onPriceInput = (e: any) => {
    const { value } = e.target;
    setToDoPrice(value);
  };

  return (
    <View maxWidth="400px">
      <h2>Shopping list:</h2>
      <TextField
        name="createTodo"
        label="ToDo"
        labelHidden
        onInput={onNameInput}
        value={toDoName}
      />
      <TextField
        name="count"
        label="Count"
        onInput={onCountInput}
        value={toDoCount}
      />
      <TextField
        name="price"
        label="Price"
        onInput={onPriceInput}
        value={toDoPrice}
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
  const [todoCount, setToDoCount] = React.useState(todo.count);
  const [todoPrice, setToDoPrice] = React.useState(todo.price);

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
    fields: { name: todoName, price: todoPrice, count: todoCount },
    schema,
  });

  return (
    <Flex as="li" key={todo.id}>
      {showEdit ? (
        <Flex direction="column">
          <TextField
            label="Update Name"
            labelHidden
            value={todoName}
            width="100%"
            onChange={(e: any) => {
              setToDoName(e.target.value);
            }}
          />
          <TextField
            label="Update Count"
            labelHidden
            value={todoCount}
            width="100%"
            onChange={(e: any) => {
              setToDoCount(e.target.value);
            }}
          />
          <TextField
            label="Update Price"
            labelHidden
            value={todoPrice}
            width="100%"
            onChange={(e: any) => {
              setToDoPrice(e.target.value);
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
              setToDoPrice(null);
              setToDoCount(null);
            }}
          >
            Clear
          </Button>
        </Flex>
      ) : (
        <Button isFullWidth variation="link" onClick={toggleEdit}>
          {todo.name} - {todo.count} @ {todo.price}
        </Button>
      )}
      <Button onClick={() => deleteTodoAction()}>Delete</Button>
    </Flex>
  );
};
