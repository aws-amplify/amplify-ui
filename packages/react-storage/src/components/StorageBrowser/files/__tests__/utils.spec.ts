import type { FileItem } from '../../actions';

import type { FileItems } from '../types';
import { getFileItems, parseFileSelectParams } from '../utils';

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

describe('files context utils', () => {
  describe('getFileItems', () => {
    it('returns the previous `items` when incoming `files` are `undefined`', () => {
      const previous = [fileItemOne, fileItemTwo];
      const output = getFileItems(previous, undefined);

      expect(output).toBe(previous);
    });

    it('returns the previous `items` when incoming `files` is an empty array', () => {
      const previous = [fileItemOne, fileItemTwo];
      const output = getFileItems(previous, []);

      expect(output).toBe(previous);
    });

    it('returns the previous `items` when incoming `files` are all duplicates', () => {
      const incoming = [fileOne, fileTwo];
      const previous = [fileItemOne, fileItemTwo];
      const output = getFileItems(previous, incoming);

      expect(output).toBe(previous);
    });

    it('filters incoming `files` that exist in previous `items`', () => {
      const incoming = [fileOne, fileTwo, fileThree];
      const previous = [fileItemOne, fileItemTwo];
      const output = getFileItems(previous, incoming);

      expect(output).not.toBe(previous);
      expect(output).toHaveLength(3);

      const newItem = output![1];

      expect(newItem.file).toBe(fileThree);
      expect(newItem.key).toBe(fileThree.name);
      expect(typeof newItem.id).toBe('string');
    });

    it('returns the sorted next `items` when previous `items` are `undefined`', () => {
      const incoming = [fileTwo, fileOne];
      const previous: FileItems = [];
      const output = getFileItems(previous, incoming);

      expect(output).toHaveLength(2);
      const [itemOne, itemTwo] = output!;

      expect(itemOne.file).toBe(fileOne);
      expect(itemTwo.file).toBe(fileTwo);
    });

    it('merges, sorts and returns previous and next `items`', () => {
      const incoming = [fileThree];
      const previous = [fileItemOne, fileItemTwo];
      const output = getFileItems(previous, incoming);

      expect(output).toHaveLength(3);

      const [itemOne, itemTwo, itemThree] = output!;

      // fileItemOne.key === 'item-one'
      expect(itemOne.key).toBe(fileItemOne.key);

      // fileThree.name === 'item-three'
      expect(itemTwo.key).toBe(fileThree.name);

      // fileItemTwo.key === 'item-two'
      expect(itemThree.key).toBe(fileItemTwo.key);
    });

    it('returns the webKitRelativePath as key when available', () => {
      const incoming = [
        { ...fileThree, webkitRelativePath: 'test/file/file-three' },
      ] as File[];
      const previous = [fileItemOne, fileItemTwo];
      const output = getFileItems(previous, incoming);

      expect(output).toHaveLength(3);
      expect(output![2].key).toBe('test/file/file-three');
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
