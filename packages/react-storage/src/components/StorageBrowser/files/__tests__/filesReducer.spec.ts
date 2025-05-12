import type { FileItem } from '../../actions';

import { DEFAULT_STATE } from '../constants';
import { filesReducer } from '../filesReducer';

let uuid = 0;
Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => {
      uuid++;
      return uuid.toString();
    },
  },
});

const fileOne = new File([], 'file-one');
const fileTwo = new File([], 'file-two');
const fileThree = new File([], 'file-three');
const invalidFile = new File([], 'invalid-file-one');

const fileItemOne: FileItem = {
  id: 'item-one',
  file: fileOne,
  key: fileOne.name,
};

const fileItemTwo: FileItem = {
  id: 'item-two',
  file: fileTwo,
  key: fileTwo.name,
};

describe('filesReducer', () => {
  it('returns the expected state on `add` action when only valid files are provided', () => {
    const incoming = [fileOne, fileTwo, fileThree];
    const previous = {
      items: [fileItemOne, fileItemTwo],
      invalidFiles: undefined,
    };

    const output = filesReducer(previous, {
      type: 'ADD_FILE_ITEMS',
      files: incoming,
    });

    const expected = {
      items: [
        fileItemOne,
        { file: fileThree, id: expect.any(String), key: fileThree.name },
        fileItemTwo,
      ],
      invalidFiles: undefined,
    };

    expect(output).toStrictEqual(expected);
  });

  it('returns the expected state on `add files` action when only invalid files are provided', () => {
    const incoming = [invalidFile];
    const previous = {
      items: [fileItemOne, fileItemTwo],
      invalidFiles: undefined,
    };

    const output = filesReducer(previous, {
      type: 'ADD_FILE_ITEMS',
      invalidFiles: incoming,
    });

    const expected = {
      items: [fileItemOne, fileItemTwo],
      invalidFiles: [
        {
          file: invalidFile,
          id: expect.any(String),
          key: invalidFile.name,
        },
      ],
    };

    expect(output).toStrictEqual(expected);
  });

  it('returns the same state on `add files` action when files and/or invalidFiles are `undefined`', () => {
    const previous = {
      items: [fileItemOne, fileItemTwo],
      invalidFiles: undefined,
    };

    const outputOne = filesReducer(previous, {
      type: 'ADD_FILE_ITEMS',
      files: undefined,
    });

    // assert referential equality
    expect(outputOne).toBe(previous);

    const outputTwo = filesReducer(previous, {
      type: 'ADD_FILE_ITEMS',
      invalidFiles: undefined,
    });

    // assert referential equality
    expect(outputTwo).toBe(previous);

    const outputThree = filesReducer(previous, {
      type: 'ADD_FILE_ITEMS',
      files: undefined,
      invalidFiles: undefined,
    });

    // assert referential equality
    expect(outputThree).toBe(previous);
  });

  it('returns the same state on `add files` action when files and/or invalidFiles are empty arrays', () => {
    const incoming: File[] = [];
    const previous = {
      items: [fileItemOne, fileItemTwo],
      invalidFiles: undefined,
    };

    const outputOne = filesReducer(previous, {
      type: 'ADD_FILE_ITEMS',
      files: incoming,
    });

    // assert referential equality
    expect(outputOne).toBe(previous);

    const outputTwo = filesReducer(previous, {
      type: 'ADD_FILE_ITEMS',
      invalidFiles: incoming,
    });

    // assert referential equality
    expect(outputTwo).toBe(previous);

    const outputThree = filesReducer(previous, {
      type: 'ADD_FILE_ITEMS',
      files: incoming,
      invalidFiles: incoming,
    });

    // assert referential equality
    expect(outputThree).toBe(previous);
  });

  it('returns the expected state on `remove` action', () => {
    const previous = {
      items: [fileItemOne, fileItemTwo],
      invalidFiles: undefined,
    };
    const targetId = fileItemOne.id;

    const output = filesReducer(previous, {
      type: 'REMOVE_FILE_ITEM',
      id: targetId,
    });

    const expected = {
      items: [fileItemTwo],
      invalidFiles: undefined,
    };

    expect(output).toStrictEqual(expected);
  });

  it('returns the expected state on `remove` action when previous is undefined', () => {
    const previous = DEFAULT_STATE;
    const targetId = 'not a real id lol';

    const output = filesReducer(previous, {
      type: 'REMOVE_FILE_ITEM',
      id: targetId,
    });

    // assert referential equality
    expect(output).toBe(DEFAULT_STATE);
  });

  it('returns the same state on `remove` action when no items are removed', () => {
    const previous = {
      items: [fileItemOne, fileItemTwo],
      invalidFiles: undefined,
    };
    const targetId = 'not a real id lol';

    const output = filesReducer(previous, {
      type: 'REMOVE_FILE_ITEM',
      id: targetId,
    });

    // assert referential equality
    expect(output).toBe(previous);
  });

  it('returns the expected state on `remove` action when all items are removed', () => {
    const previous = {
      items: [fileItemOne],
      invalidFiles: undefined,
    };
    const targetId = fileItemOne.id;

    const output = filesReducer(previous, {
      type: 'REMOVE_FILE_ITEM',
      id: targetId,
    });

    expect(output).toStrictEqual(DEFAULT_STATE);
  });

  it('returns the expected state on reset `action`', () => {
    const previous = {
      items: [fileItemOne, fileItemTwo],
      invalidFiles: undefined,
    };

    const output = filesReducer(previous, { type: 'RESET_FILE_ITEMS' });

    expect(output).toStrictEqual(DEFAULT_STATE);
  });
});
