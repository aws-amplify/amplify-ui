import type { FileItem } from '../../actions';

import type { FileItems } from '../types';
import { processFileItems, parseFileSelectParams } from '../utils';

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

describe('getFileItems', () => {
  it('returns the previous `items` when `files` is `undefined`', () => {
    const previous = [fileItemOne, fileItemTwo];
    const output = processFileItems(previous, undefined);

    expect(output).toBe(previous);
  });

  it('returns the previous `items` when `files` is an empty array', () => {
    const previous = [fileItemOne, fileItemTwo];
    const output = processFileItems(previous, []);

    expect(output).toBe(previous);
  });

  it('returns the previous `items` when `files` are all duplicates', () => {
    const incoming = [fileOne, fileTwo];
    const previous = [fileItemOne, fileItemTwo];
    const output = processFileItems(previous, incoming);

    expect(output).toBe(previous);
  });

  it('filters incoming `files` that exist in previous `items`', () => {
    const incoming = [fileOne, fileTwo, fileThree];
    const previous = [fileItemOne, fileItemTwo];
    const output = processFileItems(previous, incoming);

    expect(output).not.toBe(previous);

    const expected = [
      fileItemOne,
      { file: fileThree, id: expect.any(String), key: fileThree.name },
      fileItemTwo,
    ];

    expect(output).toStrictEqual(expected);
  });

  it('returns the sorted next `items` when previous `items` are `undefined`', () => {
    const incoming = [fileTwo, fileOne];
    const previous: FileItems = [];

    const output = processFileItems(previous, incoming);
    const expected = [
      { file: fileOne, id: expect.any(String), key: fileOne.name },
      { file: fileTwo, id: expect.any(String), key: fileTwo.name },
    ];

    expect(output).toStrictEqual(expected);
  });

  it('merges, sorts and returns previous and next `items`', () => {
    const incoming = [fileThree];
    const previous = [fileItemOne, fileItemTwo];
    const output = processFileItems(previous, incoming);

    const expected = [
      fileItemOne,
      { file: fileThree, id: expect.any(String), key: fileThree.name },
      fileItemTwo,
    ];

    expect(output).toStrictEqual(expected);
  });

  it('returns the webKitRelativePath as key when available', () => {
    const incoming = [
      { ...fileThree, webkitRelativePath: 'test/file/file-three' },
    ] as File[];
    const previous = [fileItemOne, fileItemTwo];
    const output = processFileItems(previous, incoming);

    expect(output).toHaveLength(3);
    expect(output?.[2].key).toBe('test/file/file-three');
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
