import { createFileDataItem } from '../utils';

const fileKey = 'some-file.jpeg2000';
const id = 'intentionally-static-test-id';

describe('createFileDataItem', () => {
  it('creates a FileDataItem from FileData', () => {
    expect(
      createFileDataItem({
        key: `prefix/${fileKey}`,
        lastModified: new Date(1),
        id,
        size: 0,
        type: 'FILE' as const,
      })
    ).toStrictEqual(expect.objectContaining({ fileKey }));
  });
});
