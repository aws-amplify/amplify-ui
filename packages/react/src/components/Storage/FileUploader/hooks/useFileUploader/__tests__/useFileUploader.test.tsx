import { renderHook, act } from '@testing-library/react-hooks';

import { useFileUploader } from '..';

// mock `aws-amplify` to prevent logging auth errors during test runs
jest.mock('aws-amplify');
const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });

describe('useFileUploader', () => {
  beforeEach(() => {});

  it('exists', () => {
    const { result } = renderHook(() => useFileUploader(200, [], true));

    expect(result).toBeTruthy();
  });

  it('returns 1 files from target files that match accepted files', () => {
    const { result } = renderHook(() => useFileUploader(200, ['.png'], true));

    const {
      current: { addTargetFiles },
    } = result;
    const numOfFiles = addTargetFiles?.([fakeFile]);

    expect(numOfFiles).toEqual(1);
  });

  it('returns 0 files from target files do not match accepted files', () => {
    const { result } = renderHook(() => useFileUploader(200, ['.jpg'], true));

    const {
      current: { addTargetFiles },
    } = result;
    const numOfFiles = addTargetFiles?.([fakeFile]);

    expect(numOfFiles).toEqual(0);
  });

  it('file statuses array gets updated when file is added', () => {
    const { result } = renderHook(() => useFileUploader(200, ['.png'], true));

    const {
      current: { addTargetFiles },
    } = result;
    act(() => {
      addTargetFiles?.([fakeFile]);
    });
    expect(result.current.fileStatuses.length).toEqual(1);
  });
});
