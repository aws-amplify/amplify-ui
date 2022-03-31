import * as React from 'react';

import {
  TextField,
  Button,
  Collection,
  Flex,
  View,
  CheckboxField,
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
  const [toDoCompleted, setToDoCompleted] = React.useState(false);

  const createTodoAction = useDataStoreCreateAction({
    model: Todo,
    fields: {
      name: toDoName,
      price: toDoPrice,
      count: toDoCount,
      completed: toDoCompleted,
    },
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
  const onCompletedChange = (e: any) => {
    const { checked } = e.target;
    setToDoCompleted(checked);
  };

  return (
    <View maxWidth="400px">
      <h2>Shopping list:</h2>
      <TextField
        name="createTodo"
        label="Name"
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
      <CheckboxField
        name="completed"
        label="Completed"
        value="yes"
        checked={toDoCompleted}
        onChange={onCompletedChange}
      />
      <Button
        onClick={async () => {
          await createTodoAction();
          setToDoName('');
          setToDoCount('');
          setToDoPrice('');
          setToDoCompleted(false);
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
  const [toDoName, setToDoName] = React.useState(todo.name);
  // convert count and price to string to simulate Amplify Studio customers
  // use of TextField for Int and Boolean scalar values
  const [toDoCount, setToDoCount] = React.useState(todo.count.toString());
  const [toDoPrice, setToDoPrice] = React.useState(todo.price.toString());
  const [toDoCompleted, setToDoCompleted] = React.useState(todo.completed);

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
    fields: {
      name: toDoName,
      price: toDoPrice,
      count: toDoCount,
      completed: toDoCompleted,
    },
    schema,
  });

  return (
    <Flex as="li" key={todo.id}>
      {showEdit ? (
        <Flex direction="column">
          <TextField
            label="Update Name"
            labelHidden
            value={toDoName}
            width="100%"
            onChange={(e: any) => {
              setToDoName(e.target.value);
            }}
          />
          <TextField
            label="Update Count"
            labelHidden
            value={toDoCount}
            width="100%"
            onChange={(e: any) => {
              setToDoCount(e.target.value);
            }}
          />
          <TextField
            label="Update Price"
            labelHidden
            value={toDoPrice}
            width="100%"
            onChange={(e: any) => {
              setToDoPrice(e.target.value);
            }}
          />
          <CheckboxField
            name="toDoCompleted"
            label="Update Completed"
            value="checked"
            checked={toDoCompleted}
            onChange={(e: any) => {
              setToDoCompleted(e.target.checked);
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
              setToDoPrice('');
              setToDoCount('');
            }}
          >
            Clear
          </Button>
        </Flex>
      ) : (
        <Button isFullWidth variation="link" onClick={toggleEdit}>
          {todo.name} - {todo.count} @ {todo.price} {todo.completed.toString()}
        </Button>
      )}
      <Button onClick={() => deleteTodoAction()}>Delete</Button>
    </Flex>
  );
};
