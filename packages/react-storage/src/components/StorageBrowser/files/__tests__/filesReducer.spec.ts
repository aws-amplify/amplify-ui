import type { FileItem } from '../../actions';
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
  it('adds `fileItems` as expected', () => {
    const incoming = [fileOne, fileTwo, fileThree];
    const previous = {
      items: [fileItemOne, fileItemTwo],
      invalidFiles: undefined,
    };
    const output = filesReducer(previous, {
      type: 'ADD_FILE_ITEMS',
      files: incoming,
    });

    expect(output.items).toHaveLength(3);
  });

  it('removes a `fileItem` as expected', () => {
    const previous = {
      items: [fileItemOne, fileItemTwo],
      invalidFiles: undefined,
    };
    const targetId = fileItemOne.id;

    const output = filesReducer(previous, {
      type: 'REMOVE_FILE_ITEM',
      id: targetId,
    });

    expect(output.items!).toHaveLength(1);
    expect(output.items![0]).toBe(fileItemTwo);
  });

  it('returns the previous items on remove when previous and next items are the same length', () => {
    const previous = {
      items: [fileItemOne, fileItemTwo],
      invalidFiles: undefined,
    };
    const targetId = 'not a real id lol';

    const output = filesReducer(previous, {
      type: 'REMOVE_FILE_ITEM',
      id: targetId,
    });

    expect(output.items!).toHaveLength(2);
    expect(output).toEqual(previous);
  });

  it('resets `fileItems` as expected', () => {
    const previous = {
      items: [fileItemOne, fileItemTwo],
      invalidFiles: undefined,
    };

    const output = filesReducer(previous, { type: 'RESET_FILE_ITEMS' });

    expect(output.items).toBe(undefined);
  });
});
