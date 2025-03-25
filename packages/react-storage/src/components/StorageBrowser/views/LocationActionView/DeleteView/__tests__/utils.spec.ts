import { DeleteHandlerData } from '../../../../actions';
import { Task } from '../../../../tasks';

import { getFolderText } from '../utils';

describe('getFolderText', () => {
  it('returns the expected value', () => {
    const expected = 'my-prefix/';
    const fileKey = 'my-key.jpg';
    const key = `${expected}${fileKey}`;

    const task: Task<DeleteHandlerData> = {
      data: {
        fileKey,
        key,
        id: 'id',
      },
      message: undefined,
      progress: undefined,
      status: 'QUEUED',
    };
    const output = getFolderText(task);

    expect(output).toBe(expected);
  });
});
