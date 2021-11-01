import {
  createDataStorePredicate,
  DataStorePredicateObject,
} from '../datastore';

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
      name: namePredicate,
    };

    predicate(condition);

    expect(namePredicate).toHaveBeenCalledWith(
      namePredicateObject.operator,
      namePredicateObject.operand
    );
  });

  test('should generate a group predicate: or', () => {
    const predicateObject: DataStorePredicateObject = {
      or: [namePredicateObject, agePredicateObject],
    };

    const predicate = createDataStorePredicate<Post>(predicateObject);

    const namePredicate = jest.fn();
    const agePredicate = jest.fn();

    const condition: any = {
      or: (p) =>
        p({
          name: (operator, operand) => {
            namePredicate(operator, operand);
            return {
              age: (operator, operand) => {
                agePredicate(operator, operand);
                return p;
              },
            };
          },
        }),
    };

    predicate(condition);

    expect(namePredicate).toHaveBeenCalledWith(
      namePredicateObject.operator,
      namePredicateObject.operand
    );
    expect(agePredicate).toHaveBeenCalledWith(
      agePredicateObject.operator,
      agePredicateObject.operand
    );
  });

  test('should generate a group predicate: and', () => {
    const predicateObject: DataStorePredicateObject = {
      and: [namePredicateObject, agePredicateObject],
    };

    const predicate = createDataStorePredicate<Post>(predicateObject);

    const namePredicate = jest.fn();
    const agePredicate = jest.fn();

    const condition: any = {
      and: (p) => {
        p({
          name: (operator, operand) => {
            namePredicate(operator, operand);
            return {
              age: (operator, operand) => {
                agePredicate(operator, operand);
              },
            };
          },
        });
      },
    };

    predicate(condition);

    expect(namePredicate).toHaveBeenCalledWith(
      namePredicateObject.operator,
      namePredicateObject.operand
    );
    expect(agePredicate).toHaveBeenCalledWith(
      agePredicateObject.operator,
      agePredicateObject.operand
    );
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
      and: (p) => {
        p({
          name: (operator, operand) => {
            namePredicate(operator, operand);
            return {
              or: (p) =>
                p({
                  age: (operator, operand) => {
                    agePredicate(operator, operand);
                    return p;
                  },
                }),
            };
          },
        });
      },
    };

    predicate(condition);

    expect(namePredicate).toHaveBeenCalledWith(
      namePredicateObject.operator,
      namePredicateObject.operand
    );
    expect(agePredicate).toHaveBeenCalledWith(
      agePredicateObject.operator,
      agePredicateObject.operand
    );
  });
});
