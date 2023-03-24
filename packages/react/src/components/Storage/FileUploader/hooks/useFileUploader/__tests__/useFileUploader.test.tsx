import { renderHook, act } from '@testing-library/react-hooks';
import * as UIModule from '@aws-amplify/ui';
import { useFileUploader } from '..';

type DragEvent = React.DragEvent<HTMLDivElement>;

const uploadCheckMaxSizeSpy = jest.spyOn(UIModule, 'checkMaxSize');
// mock `aws-amplify` to prevent logging auth errors during test runs
jest.mock('aws-amplify');
const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });

const input = {
  maxSize: 200,
  acceptedFileTypes: ['.png'],
  hasMultipleFiles: true,
  isLoading: false,
  setAutoLoad: () => null,
};

describe('useFileUploader', () => {
  beforeEach(() => {});

  it('exists', () => {
    const { result } = renderHook(() =>
      useFileUploader({ ...input, acceptedFileTypes: [] })
    );

    expect(result).toBeTruthy();
  });

  it('returns 1 files from target files that match accepted files', () => {
    const { result } = renderHook(() => useFileUploader(input));

    const {
      current: { addTargetFiles },
    } = result;

    const numOfFiles = addTargetFiles([fakeFile]);

    expect(numOfFiles).toEqual(1);
  });

  it('returns 0 files from target files do not match accepted files', () => {
    const { result } = renderHook(() =>
      useFileUploader({
        ...input,
        acceptedFileTypes: ['.jpg'],
      })
    );

    const {
      current: { addTargetFiles },
    } = result;

    const numOfFiles = addTargetFiles?.([fakeFile]);

    expect(numOfFiles).toEqual(0);
  });

  it('returns 0 if target files is empty for addTargetFiles', () => {
    const { result } = renderHook(() => useFileUploader(input));

    const {
      current: { addTargetFiles },
    } = result;

    act(() => {
      addTargetFiles?.([]);
    });

    expect(result.current.fileStatuses.length).toEqual(0);
  });

  it('updates the file statuses array when file is added', () => {
    const { result } = renderHook(() => useFileUploader(input));

    const {
      current: { addTargetFiles },
    } = result;

    act(() => {
      addTargetFiles?.([fakeFile]);
    });

    expect(result.current.fileStatuses.length).toEqual(1);
  });

  it('returns 1 and updates file statuses when not hasMultipleFiles and target length is 1', () => {
    const { result } = renderHook(() =>
      useFileUploader({
        ...input,
        hasMultipleFiles: false,
      })
    );

    const {
      current: { addTargetFiles },
    } = result;

    act(() => {
      addTargetFiles?.([fakeFile]);
    });

    expect(result.current.fileStatuses.length).toEqual(1);
  });

  it('returns 1 and updates file statutuses when not hasMultipleFiles and target length > 1', () => {
    const { result } = renderHook(() =>
      useFileUploader({
        ...input,
        hasMultipleFiles: false,
      })
    );

    const {
      current: { addTargetFiles },
    } = result;

    act(() => {
      addTargetFiles?.([fakeFile, fakeFile]);
    });

    expect(result.current.fileStatuses.length).toEqual(1);
  });

  it('clears the data when onDragStart begins', () => {
    const { result } = renderHook(() => useFileUploader(input));
    const event = {
      dataTransfer: { clearData: () => '' },
    } as unknown as DragEvent;
    const eventSpy = jest.spyOn(event.dataTransfer, 'clearData');

    const {
      current: { onDragStart },
    } = result;

    act(() => {
      onDragStart?.(event);
    });

    expect(eventSpy).toBeCalled();
  });

  it('prevents and stops event onDragEnter', () => {
    const { result } = renderHook(() => useFileUploader(input));
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    } as unknown as DragEvent;

    const {
      current: { onDragEnter },
    } = result;

    act(() => {
      onDragEnter?.(event);
    });

    expect(event.preventDefault).toBeCalled();
    expect(event.stopPropagation).toBeCalled();
  });

  it('prevents default and propagation onDragLeave', () => {
    const { result } = renderHook(() => useFileUploader(input));
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    } as unknown as DragEvent;

    const {
      current: { onDragLeave },
    } = result;

    act(() => {
      onDragLeave?.(event);
    });

    expect(event.preventDefault).toBeCalled();
    expect(event.stopPropagation).toBeCalled();
  });

  it('prevents default and propagation onDragOver', () => {
    const { result } = renderHook(() => useFileUploader(input));
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      dataTransfer: { dropEffect: '' },
    } as unknown as DragEvent;

    const {
      current: { onDragOver },
    } = result;

    act(() => {
      onDragOver?.(event);
    });

    expect(event.preventDefault).toBeCalled();
    expect(event.stopPropagation).toBeCalled();
    expect(event.dataTransfer.dropEffect).toEqual('copy');
  });

  it('prevents default and propagation onDrop', () => {
    const { result } = renderHook(() => useFileUploader(input));
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      dataTransfer: { dropEffect: '', files: [fakeFile] },
    } as unknown as DragEvent;

    const {
      current: { onDrop },
    } = result;

    act(() => {
      onDrop?.(event);
    });

    expect(event.preventDefault).toBeCalled();
    expect(event.stopPropagation).toBeCalled();
  });

  it('updates the updateFileStatus array with an error', () => {
    const { result } = renderHook(() =>
      useFileUploader({
        ...input,
        hasMultipleFiles: false,
        maxSize: 1,
      })
    );

    uploadCheckMaxSizeSpy.mockReturnValue('error 1b');

    const {
      current: { addTargetFiles },
    } = result;

    act(() => {
      addTargetFiles?.([fakeFile]);
    });

    expect(result.current.fileStatuses).toEqual([
      {
        file: fakeFile,
        fileErrors: 'error 1b',
        fileState: 'error',
        name: 'hello.png',
      },
    ]);
  });

  it('returns 1 file from target files that matches image/* mime type', () => {
    const { result } = renderHook(() =>
      useFileUploader({
        ...input,
        acceptedFileTypes: ['image/*'],
      })
    );

    const fakeFileHTML = new File(['goodbye'], 'goodbye.html', {
      type: 'text/html',
    });

    const {
      current: { addTargetFiles },
    } = result;

    const numOfFiles = addTargetFiles?.([fakeFile, fakeFileHTML]);

    expect(numOfFiles).toEqual(1);
  });
});
