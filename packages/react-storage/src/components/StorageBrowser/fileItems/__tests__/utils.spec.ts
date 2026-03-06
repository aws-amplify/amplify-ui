import type { FileItem } from '../../actions';

import { DEFAULT_RESOLVED_FILES, UPLOAD_FILE_SIZE_LIMIT } from '../constants';
import type { FileItems } from '../types';
import {
  defaultValidateFile,
  parseFileSelectParams,
  processFileItems,
  resolveFiles,
} from '../utils';

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

const invalidFileOne = {
  ...new File([], 'invalid-file-one'),
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

describe('resolveFiles', () => {
  it('returns the default value when no files are provided', () => {
    const output = resolveFiles(undefined);

    expect(output).toBe(DEFAULT_RESOLVED_FILES);
  });

  it('returns the expected value when only `files` is provided', () => {
    const output = resolveFiles([fileOne, invalidFileOne]);
    const expected = {
      validFiles: [fileOne, invalidFileOne],
      invalidFiles: undefined,
    };

    expect(output).toStrictEqual(expected);
  });

  it('returns the expected value when `files` and `validateFile` are provided', () => {
    const output = resolveFiles([fileOne, invalidFileOne], defaultValidateFile);
    const expected = {
      validFiles: [fileOne],
      invalidFiles: [invalidFileOne],
    };

    expect(output).toStrictEqual(expected);
  });
});

describe('processFileItems', () => {
  it('returns the previous items when `files` is `undefined`', () => {
    const previous = [fileItemOne, fileItemTwo];
    const output = processFileItems(previous, undefined);

    expect(output).toBe(previous);
  });

  it('returns the previous items when `files` are all duplicates', () => {
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

  it('returns the sorted `nextItems` when `prevItems` are `undefined`', () => {
    const incoming = [fileTwo, fileOne];
    const previous: FileItems = [];

    const output = processFileItems(previous, incoming);
    const expected = [
      { file: fileOne, id: expect.any(String), key: fileOne.name },
      { file: fileTwo, id: expect.any(String), key: fileTwo.name },
    ];

    expect(output).toStrictEqual(expected);
  });

  it('merges, sorts and returns previous and next items', () => {
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
