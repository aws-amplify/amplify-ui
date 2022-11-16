import { DataStorePredicateObject } from '../../types/datastore';
import { createDataStorePredicate } from '../datastore';

type Post = {
  id: string;
  name: string;
  age: string;
};

describe('createDataStorePredicate', () => {
  const namePredicateObject = {
    field: 'name',
    operator: 'startsWith',
    operand: 'John',
  };

  const agePredicateObject = {
    field: 'age',
    operator: 'gt',
    operand: '25',
  };

  test('should generate a simple predicate', () => {
    const predicate = createDataStorePredicate<Post>(namePredicateObject);

    const namePredicate = jest.fn();

    const condition: any = {
      [namePredicateObject.field]: {
        [namePredicateObject.operator]: namePredicate,
      },
    };

    predicate(condition);
    expect(namePredicate).toHaveBeenCalledWith(namePredicateObject.operand);
  });

  test('should generate a group predicate: or', () => {
    const predicateObject: DataStorePredicateObject = {
      or: [namePredicateObject, agePredicateObject],
    };

    const predicate = createDataStorePredicate<Post>(predicateObject);

    console.log({ predicate: predicate.toString() });

    const namePredicate = jest.fn();
    const agePredicate = jest.fn();

    const condition: any = {
      or: (p) => [
        p({
          [namePredicateObject.field]: {
            [namePredicateObject.operator]: namePredicate,
          },
        }),
        p({
          [agePredicateObject.field]: {
            [agePredicateObject.operator]: agePredicate,
          },
        }),
      ],
    };

    predicate(condition);

    expect(namePredicate).toHaveBeenCalledWith(namePredicateObject.operand);
    expect(agePredicate).toHaveBeenCalledWith(agePredicateObject.operand);
  });

  test('should generate a group predicate: and', () => {
    const predicateObject: DataStorePredicateObject = {
      and: [namePredicateObject, agePredicateObject],
    };

    const predicate = createDataStorePredicate<Post>(predicateObject);

    const namePredicate = jest.fn();
    const agePredicate = jest.fn();

    const condition: any = {
      and: (p) => [
        p({
          [namePredicateObject.field]: {
            [namePredicateObject.operator]: namePredicate,
          },
        }),
        p({
          [agePredicateObject.field]: {
            [agePredicateObject.operator]: agePredicate,
          },
        }),
      ],
    };

    predicate(condition);

    expect(namePredicate).toHaveBeenCalledWith(namePredicateObject.operand);
    expect(agePredicate).toHaveBeenCalledWith(agePredicateObject.operand);
  });

  test('should generate a nested predicate', () => {
    const predicateObject: DataStorePredicateObject = {
      and: [
        namePredicateObject,
        {
          or: [agePredicateObject],
        },
      ],
    };

    const predicate = createDataStorePredicate<Post>(predicateObject);

    const namePredicate = jest.fn();
    const agePredicate = jest.fn();

    const condition: any = {
      and: (andGroup) => {
        andGroup({
          [namePredicateObject.field]: {
            [namePredicateObject.operator]: namePredicate,
          },
          or: (orGroup) => {
            orGroup({
              [agePredicateObject.field]: {
                [agePredicateObject.operator]: agePredicate,
              },
            });
          },
        });
      },
    };
    predicate(condition);

    expect(namePredicate).toHaveBeenCalledWith(namePredicateObject.operand);
    expect(agePredicate).toHaveBeenCalledWith(agePredicateObject.operand);
  });
});
