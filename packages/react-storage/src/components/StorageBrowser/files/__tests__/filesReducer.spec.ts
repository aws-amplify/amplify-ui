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
const invalidFileOne = new File([], 'invalid-file-one');
const invalidFileTwo = new File([], 'invalid-file-two');

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

const fileItemThree: FileItem = {
  file: fileThree,
  id: expect.any(String),
  key: fileThree.name,
};

const invalidFileItemOne: FileItem = {
  file: invalidFileOne,
  id: expect.any(String),
  key: invalidFileOne.name,
};

const invalidFileItemTwo: FileItem = {
  file: invalidFileTwo,
  id: expect.any(String),
  key: invalidFileTwo.name,
};

describe('filesReducer', () => {
  it('returns the expected state on `ADD_FILE_ITEMS` action when valid and invalid files are provided', () => {
    const incomingValid = [fileOne, fileTwo];
    const incomingInvalid = [invalidFileOne];
    const previous = {
      validItems: [fileItemOne, fileItemTwo],
      invalidItems: undefined,
    };

    const output = filesReducer(previous, {
      type: 'ADD_FILE_ITEMS',
      validFiles: incomingValid,
      invalidFiles: incomingInvalid,
    });

    const expected = {
      validItems: [fileItemOne, fileItemTwo],
      invalidItems: [invalidFileItemOne],
    };

    expect(output).toStrictEqual(expected);
  });

  it('returns the previous state on `ADD_FILE_ITEMS` action when no files are provided', () => {
    const previous = {
      validItems: [fileItemOne, fileItemTwo],
      invalidItems: undefined,
    };

    const output = filesReducer(previous, {
      type: 'ADD_FILE_ITEMS',
    });

    // assert referential equality
    expect(output).toBe(previous);
  });

  it('resets `state.invalidItems` to track latest files added from `ADD_FILE_ITEMS` action', () => {
    const previous = {
      validItems: [fileItemTwo],
      invalidItems: [invalidFileItemOne],
    };

    const output = filesReducer(previous, {
      type: 'ADD_FILE_ITEMS',
      validFiles: [fileThree],
      invalidFiles: [invalidFileTwo],
    });

    const expected = {
      validItems: [fileItemThree, fileItemTwo],
      invalidItems: [invalidFileItemTwo],
    };

    expect(output).toStrictEqual(expected);
  });

  it('returns the expected state on `REMOVE_FILE_ITEM` action when last item is removed', () => {
    const previous = {
      validItems: [fileItemOne],
      invalidItems: undefined,
    };
    const targetId = fileItemOne.id;

    const output = filesReducer(previous, {
      type: 'REMOVE_FILE_ITEM',
      id: targetId,
    });

    expect(output).toStrictEqual(DEFAULT_STATE);
  });

  it('returns the previous state on `REMOVE_FILE_ITEM` action when previous `validItems` is `undefined`', () => {
    const targetId = 'not a real id lol';

    const output = filesReducer(DEFAULT_STATE, {
      type: 'REMOVE_FILE_ITEM',
      id: targetId,
    });

    // assert referential equality
    expect(output).toBe(DEFAULT_STATE);
  });

  it('returns the previous state on `remove` action when prev and next `validItems` are same length', () => {
    const previous = {
      validItems: [fileItemOne, fileItemTwo],
      invalidItems: undefined,
    };
    const targetId = 'not a real id lol';

    const output = filesReducer(previous, {
      type: 'REMOVE_FILE_ITEM',
      id: targetId,
    });

    // assert referential equality
    expect(output).toBe(previous);
  });

  it('returns the expected state on `RESET_FILE_ITEMS` action', () => {
    const previous = {
      validItems: [fileItemOne, fileItemTwo],
      invalidItems: undefined,
    };

    const output = filesReducer(previous, {
      type: 'RESET_FILE_ITEMS',
    });

    // assert referential equality
    expect(output).toBe(DEFAULT_STATE);
  });
});
