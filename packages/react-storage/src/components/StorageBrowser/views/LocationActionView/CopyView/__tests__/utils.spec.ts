import { CopyHandlerData } from '../../../../actions';
import { Task } from '../../../../tasks';

import { getFolderText } from '../utils';

describe('getFolderText', () => {
  it('returns the expected value', () => {
    const expected = 'my-prefix/';
    const fileKey = 'my-key.jpg';
    const sourceKey = `${expected}${fileKey}`;

    const task: Task<CopyHandlerData> = {
      data: {
        fileKey,
        key: `my-destination/${fileKey}`,
        sourceKey,
        id: 'id',
        lastModified: new Date(),
      },
      message: undefined,
      progress: undefined,
      status: 'QUEUED',
    };
    const output = getFolderText(task);

    expect(output).toBe(expected);
  });
});
