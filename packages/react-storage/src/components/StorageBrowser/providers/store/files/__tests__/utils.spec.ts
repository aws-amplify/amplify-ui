import { UPLOAD_FILE_SIZE_LIMIT } from '../../../../views/LocationActionView/constants';
import { FileItem } from '../types';
import { resolveFiles, filesReducer, parseFileSelectParams } from '../utils';

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
const invalidFile = {
  ...new File([], 'file-invalid'),
  size: UPLOAD_FILE_SIZE_LIMIT + 1,
};

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

const invalidFileItem: FileItem = {
  id: 'item-invalid',
  file: invalidFile,
  key: invalidFile.name,
};

describe('files context utils', () => {
  describe('resolveFiles', () => {
    it('returns the previous `items` when incoming `files` are `undefined`', () => {
      const previous = {
        validFiles: [fileItemOne, fileItemTwo],
        invalidFiles: [],
      };
      const output = resolveFiles(previous, undefined);

      expect(output).toBe(previous);
    });

    it('returns the previous `items` when incoming `files` is an empty array', () => {
      const previous = {
        validFiles: [fileItemOne, fileItemTwo],
        invalidFiles: [],
      };
      const output = resolveFiles(previous, []);

      expect(output).toBe(previous);
    });

    it('returns the previous `items` when incoming `files` are all duplicates', () => {
      const incoming = [fileOne, fileTwo];
      const previous = {
        validFiles: [fileItemOne, fileItemTwo],
        invalidFiles: [],
      };
      const output = resolveFiles(previous, incoming);
      expect(output).toEqual(previous);
    });

    it('filters incoming `files` that exist in previous `items`', () => {
      const incoming = [fileOne, fileTwo, fileThree];
      const previous = {
        validFiles: [fileItemOne, fileItemTwo],
        invalidFiles: [],
      };
      const output = resolveFiles(previous, incoming);

      expect(output).not.toBe(previous);
      expect(output.validFiles).toHaveLength(3);

      const newItem = output.validFiles[1];

      expect(newItem.file).toBe(fileThree);
      expect(newItem.key).toBe(fileThree.name);
      expect(typeof newItem.id).toBe('string');
    });

    it('returns the sorted next `items` when previous `items` are `undefined`', () => {
      const incoming = [fileTwo, fileOne];
      const previous = { validFiles: [], invalidFiles: [] };
      const output = resolveFiles(previous, incoming);

      expect(output.validFiles).toHaveLength(2);
      const [itemOne, itemTwo] = output.validFiles;

      expect(itemOne.file).toBe(fileOne);
      expect(itemTwo.file).toBe(fileTwo);
    });

    it('merges, sorts and returns previous and next `items`', () => {
      const incoming = [fileThree];
      const previous = {
        validFiles: [fileItemOne, fileItemTwo],
        invalidFiles: [],
      };
      const output = resolveFiles(previous, incoming);

      expect(output.validFiles).toHaveLength(3);

      const [itemOne, itemTwo, itemThree] = output.validFiles;

      // fileItemOne.key === 'item-one'
      expect(itemOne.key).toBe(fileItemOne.key);

      // fileThree.name === 'item-three'
      expect(itemTwo.key).toBe(fileThree.name);

      // fileItemTwo.key === 'item-two'
      expect(itemThree.key).toBe(fileItemTwo.key);
    });

    it('returns the webKitRelativePath as key when available', () => {
      const newFile = new File([], 'new-file');
      Object.assign(newFile, { webkitRelativePath: 'test/file/new-file' });
      const incoming = [newFile];
      const previous = {
        validFiles: [fileItemOne, fileItemTwo],
        invalidFiles: [],
      };
      const { validFiles: output } = resolveFiles(previous, incoming);

      expect(output).toHaveLength(3);
      expect(output[2].key).toBe('test/file/new-file');
    });
  });

  describe('filesReducer', () => {
    it('adds `fileItems` as expected', () => {
      const incoming = [fileOne, fileTwo, fileThree];
      const previous = {
        validFiles: [fileItemOne, fileItemTwo],
        invalidFiles: [],
      };
      const output = filesReducer(previous, {
        type: 'ADD_FILE_ITEMS',
        files: incoming,
      });

      expect(output.validFiles).toHaveLength(3);
      expect(output.invalidFiles).toHaveLength(0);
    });

    it('adds `fileItems` that is invalid', () => {
      const previous = {
        validFiles: [fileItemOne, fileItemTwo],
        invalidFiles: [],
      };
      const output = filesReducer(previous, {
        type: 'ADD_FILE_ITEMS',
        files: [invalidFile],
      });

      expect(output.validFiles).toHaveLength(2);
      expect(output.invalidFiles).toHaveLength(1);
    });

    it('removes a `fileItem` as expected', () => {
      const previous = {
        validFiles: [fileItemOne, fileItemTwo],
        invalidFiles: [],
      };
      const targetId = fileItemOne.id;

      const { validFiles } = filesReducer(previous, {
        type: 'REMOVE_FILE_ITEM',
        id: targetId,
      });

      expect(validFiles).toHaveLength(1);
      expect(validFiles[0]).toBe(fileItemTwo);
    });

    it('returns the previous items on remove when previous and next items are the same length', () => {
      const previous = {
        validFiles: [fileItemOne, fileItemTwo],
        invalidFiles: [],
      };
      const targetId = 'not a real id lol';

      const { validFiles: outputValidFiles } = filesReducer(previous, {
        type: 'REMOVE_FILE_ITEM',
        id: targetId,
      });

      expect(outputValidFiles).toHaveLength(2);
      expect(outputValidFiles).toBe(previous.validFiles);
    });

    it('resets `fileItems` as expected', () => {
      const previous = {
        validFiles: [fileItemOne, fileItemTwo],
        invalidFiles: [invalidFileItem],
      };

      const { validFiles, invalidFiles } = filesReducer(previous, {
        type: 'RESET_FILE_ITEMS',
      });

      expect(validFiles).toHaveLength(0);
      expect(invalidFiles).toHaveLength(0);
    });

    it('resets invalid `fileTimes` as expected', () => {
      const previous = {
        validFiles: [fileItemOne, fileItemTwo],
        invalidFiles: [invalidFileItem],
      };

      const { validFiles, invalidFiles } = filesReducer(previous, {
        type: 'RESET_INVALID_FILE_ITEMS',
      });

      expect(validFiles).toBe(previous.validFiles);
      expect(invalidFiles).toHaveLength(0);
    });
  });

  describe('parseFileSelectParams', () => {
    it('returns the default value when `value` is `undefined`', () => {
      const output = parseFileSelectParams();

      expect(output).toStrictEqual(['FILE', undefined]);
    });

    it('returns the expected value when `value` is a `string`', () => {
      const output = parseFileSelectParams('FOLDER');

      expect(output).toStrictEqual(['FOLDER', undefined]);
    });

    it('returns the expected value when `value` is a single item array', () => {
      const output = parseFileSelectParams(['FOLDER']);

      expect(output).toStrictEqual(['FOLDER', undefined]);
    });

    it('returns the expected value when `value` is a specfied with an `accept` param', () => {
      const output = parseFileSelectParams(['FOLDER', '.lolz', '.alsololz']);

      expect(output).toStrictEqual(['FOLDER', { accept: '.lolz,.alsololz' }]);
    });
  });
});
