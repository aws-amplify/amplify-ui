import { UploadHandlerData } from '../../../../actions';
import { Task } from '../../../../tasks';

import { getFolderText } from '../utils';

describe('getFolderText', () => {
  it('returns the expected value when `file` contains a `webkitRelativePath` value', () => {
    const expected = 'local-folder/';
    const mockFile = { webkitRelativePath: expected } as File;
    const key = 'my-key.jpg';

    const task: Task<UploadHandlerData> = {
      data: {
        key,
        file: mockFile,
        id: 'id',
      },
      message: undefined,
      progress: undefined,
      status: 'QUEUED',
    };
    const output = getFolderText(task);

    expect(output).toBe(expected);
  });

  it('returns the expected value when `file` does not contain a `webkitRelativePath` value', () => {
    const expected = '-';
    const mockFile = {} as File;
    const key = 'my-key.jpg';

    const task: Task<UploadHandlerData> = {
      data: {
        key,
        file: mockFile,
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
