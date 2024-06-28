import {
  updatePaginateStateAction,
  PaginateAction,
  PaginateState,
} from '../PaginateState';

const INITIAL_STATE: PaginateState = {
  hasNext: true,
  hasPrevious: false,
  current: 1,
  shouldPaginate: false,
};

describe('updatePaginateStateAction', () => {
  it('handles a `next` action with previously loaded data and additional loadable data as expected', () => {
    const action: PaginateAction = {
      // has `nextToken`
      hasAdditionalData: true,
      loadedDataSize: 300,
      lookAhead: 2,
      pageSize: 100,
      type: 'next',
    };

    const result = updatePaginateStateAction(INITIAL_STATE, action);

    const expected: PaginateState = {
      hasNext: true,
      hasPrevious: true,
      current: 2,
      shouldPaginate: true,
    };

    expect(result).toStrictEqual(expected);
  });

  it('handles a `next` action with previously loaded data and without additional loadable data as expected', () => {
    // start on page 2
    const initialState = { ...INITIAL_STATE, current: 2 };

    const action: PaginateAction = {
      // does not have `nextToken`
      hasAdditionalData: false,
      loadedDataSize: 300,
      lookAhead: 2,
      pageSize: 100,
      type: 'next',
    };

    const result = updatePaginateStateAction(initialState, action);

    const expected: PaginateState = {
      hasNext: false,
      hasPrevious: true,
      current: 2,
      shouldPaginate: false,
    };

    expect(result).toStrictEqual(expected);
  });

  it('handles a `previous` action when there is a next page as expected', () => {
    // start on page 2
    const initialState = { ...INITIAL_STATE, current: 2 };

    const action: PaginateAction = {
      // does not have `nextToken`
      hasAdditionalData: false,
      loadedDataSize: 300,
      lookAhead: 2,
      pageSize: 100,
      type: 'previous',
    };

    const result = updatePaginateStateAction(initialState, action);

    const expected: PaginateState = {
      hasNext: true,
      hasPrevious: false,
      current: 1,
      shouldPaginate: false,
    };

    expect(result).toStrictEqual(expected);
  });

  it('handles a `previous` action when there is no next page as expected', () => {
    // start on page 2
    const initialState = { ...INITIAL_STATE, hasNext: false, page: 1 };

    const action: PaginateAction = {
      // does not have `nextToken`
      hasAdditionalData: false,
      loadedDataSize: 90,
      lookAhead: 2,
      pageSize: 100,
      type: 'previous',
    };

    const result = updatePaginateStateAction(initialState, action);

    const expected: PaginateState = {
      hasNext: false,
      hasPrevious: false,
      current: 1,
      shouldPaginate: false,
    };

    expect(result).toStrictEqual(expected);
  });

  it('throws when called with an invalid action', () => {
    const type = 'NOOOOOOOO';
    // @ts-expect-error
    const action: PaginateAction = { type };

    expect(() => updatePaginateStateAction(INITIAL_STATE, action)).toThrow(
      `Invalid value of ${type} provided as \`type\``
    );
  });
});
