import { renderHook, act } from '@testing-library/react-hooks';
import * as UIModule from '@aws-amplify/ui';
import { useFileUploader } from '..';

const uploadCheckMaxSizeSpy = jest.spyOn(UIModule, 'checkMaxSize');
// mock `aws-amplify` to prevent logging auth errors during test runs
jest.mock('aws-amplify');
const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });

const commonUseFileLoaderArgs = {
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
      useFileUploader({
        ...commonUseFileLoaderArgs,
        acceptedFileTypes: [],
      })
    );

    expect(result).toBeTruthy();
  });

  it('returns 1 files from target files that match accepted files', () => {
    const { result } = renderHook(() =>
      useFileUploader(commonUseFileLoaderArgs)
    );

    const {
      current: { addTargetFiles },
    } = result;
    const numOfFiles = addTargetFiles?.([fakeFile]);
    expect(numOfFiles).toEqual(1);
  });

  it('returns 0 files from target files do not match accepted files', () => {
    const { result } = renderHook(() =>
      useFileUploader({
        ...commonUseFileLoaderArgs,
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
    const { result } = renderHook(() =>
      useFileUploader(commonUseFileLoaderArgs)
    );

    const {
      current: { addTargetFiles },
    } = result;
    act(() => {
      addTargetFiles?.([]);
    });
    expect(result.current.fileStatuses.length).toEqual(0);
  });

  it('updates the file statuses array when file is added', () => {
    const { result } = renderHook(() =>
      useFileUploader(commonUseFileLoaderArgs)
    );

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
        ...commonUseFileLoaderArgs,
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
        ...commonUseFileLoaderArgs,
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
    const { result } = renderHook(() =>
      useFileUploader(commonUseFileLoaderArgs)
    );
    const event = { dataTransfer: { clearData: () => '' } } as any;
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
    const { result } = renderHook(() =>
      useFileUploader(commonUseFileLoaderArgs)
    );
    const event = {
      preventDefault: () => null,
      stopPropagation: () => null,
    } as any;
    const eventPrevSpy = jest.spyOn(event, 'preventDefault');
    const eventPropSpy = jest.spyOn(event, 'stopPropagation');

    const {
      current: { onDragEnter },
    } = result;
    act(() => {
      onDragEnter?.(event);
    });
    expect(eventPrevSpy).toBeCalled();
    expect(eventPropSpy).toBeCalled();
  });
  it('prevents default and propagation onDragLeave', () => {
    const { result } = renderHook(() =>
      useFileUploader(commonUseFileLoaderArgs)
    );
    const event = {
      preventDefault: () => null,
      stopPropagation: () => null,
    } as any;
    const eventPrevSpy = jest.spyOn(event, 'preventDefault');
    const eventPropSpy = jest.spyOn(event, 'stopPropagation');

    const {
      current: { onDragLeave },
    } = result;
    act(() => {
      onDragLeave?.(event);
    });
    expect(eventPrevSpy).toBeCalled();
    expect(eventPropSpy).toBeCalled();
  });
  it('prevents default and propagation onDragOver', () => {
    const { result } = renderHook(() =>
      useFileUploader(commonUseFileLoaderArgs)
    );
    const event = {
      preventDefault: () => null,
      stopPropagation: () => null,
      dataTransfer: { dropEffect: '' },
    } as any;
    const eventPrevSpy = jest.spyOn(event, 'preventDefault');
    const eventPropSpy = jest.spyOn(event, 'stopPropagation');

    const {
      current: { onDragOver },
    } = result;
    act(() => {
      onDragOver?.(event);
    });
    expect(eventPrevSpy).toBeCalled();
    expect(eventPropSpy).toBeCalled();
    expect(event.dataTransfer.dropEffect).toEqual('copy');
  });
  it('prevents default and propagation onDrop', () => {
    const { result } = renderHook(() =>
      useFileUploader(commonUseFileLoaderArgs)
    );
    const event = {
      preventDefault: () => null,
      stopPropagation: () => null,
      dataTransfer: { dropEffect: '', files: [fakeFile] },
    } as any;
    const eventPrevSpy = jest.spyOn(event, 'preventDefault');
    const eventPropSpy = jest.spyOn(event, 'stopPropagation');

    const {
      current: { onDrop },
    } = result;
    act(() => {
      onDrop?.(event);
    });
    expect(eventPrevSpy).toBeCalled();
    expect(eventPropSpy).toBeCalled();
  });
  it('updates the file status when there is an error', () => {
    const { result } = renderHook(() =>
      useFileUploader(commonUseFileLoaderArgs)
    );
    const event = {
      preventDefault: () => null,
      stopPropagation: () => null,
      dataTransfer: { dropEffect: '', files: [fakeFile] },
    } as any;

    const {
      current: { onDrop },
    } = result;
    act(() => {
      onDrop?.(event);
    });
  });
  it('updates the updateFileStatus array with an error', () => {
    const { result } = renderHook(() =>
      useFileUploader({
        ...commonUseFileLoaderArgs,
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
        ...commonUseFileLoaderArgs,
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
