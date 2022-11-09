import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import * as UseHooks from '../hooks/useFileUploader';
import { FileUploader } from '..';
import * as UIModule from '@aws-amplify/ui';
const uploadFileSpy = jest.spyOn(UIModule, 'uploadFile');
const useFileUploaderSpy = jest.spyOn(UseHooks, 'useFileUploader');
const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });

const mockReturnUseFileUploader = {
  onDragStart: () => null,
  onDragEnter: () => null,
  onDragLeave: () => null,
  onDrop: () => null,
  onDragOver: () => null,
  setFileStatuses: () => null,
  addTargetFiles: () => 1,
  showPreviewer: true,
  setShowPreviewer: () => null,
};

const commonProps = {
  level: 'public' as any,
  acceptedFileTypes: ['.png'],
  variation: 'drop' as any,
};

describe('File Uploader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('exists', async () => {
    const comp = render(<FileUploader {...commonProps} />);

    expect(comp.container).toMatchSnapshot();
  });
  it('shows a button when variation is set to button', async () => {
    render(<FileUploader {...commonProps} variation="button" />);
    const button = await screen.findByRole('button');

    expect(button).toBeTruthy();
  });
  it('shows svg drop icon when variation is set to drop', async () => {
    const { container } = render(<FileUploader {...commonProps} />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
  });

  it('will not show Previewer on empty file target', async () => {
    const { container, queryByText } = render(
      <FileUploader {...commonProps} variation="button" />
    );

    const input = container.getElementsByTagName('input')[0];
    fireEvent.change(input, {
      target: { files: [] },
    });
    const text = await queryByText(/files selected/);

    expect(text).not.toBeInTheDocument();
  });

  it('it calls uploadFile with expected arguments', async () => {
    uploadFileSpy.mockResolvedValue({} as never);
    const { container } = render(<FileUploader {...commonProps} />);

    const input = container.getElementsByTagName('input')[0];
    fireEvent.change(input, {
      target: { files: [fakeFile] },
    });

    const clickButton = await screen.findByRole('button', {
      name: 'Upload 1 files',
    });

    fireEvent.click(clickButton);

    expect(uploadFileSpy).toBeCalledWith({
      completeCallback: expect.any(Function),
      errorCallback: expect.any(Function),
      file: fakeFile,
      fileName: fakeFile.name,
      level: 'public',
      progressCallback: expect.any(Function),
    });
  });
  it('skips files that are already uploaded', async () => {
    uploadFileSpy.mockResolvedValue({} as never);
    const fileName2 = 'hello2.png';
    const fileStatuses = [
      {
        percentage: 100,
        uploadTask: undefined,
        fileErrors: undefined,
        name: 'hello.png',
        file: fakeFile,
        fileState: 'success' as any,
      },
      {
        percentage: 0,
        uploadTask: undefined,
        fileErrors: undefined,
        name: fileName2,
        file: fakeFile,
        fileState: null,
      },
    ];

    useFileUploaderSpy.mockReturnValue({
      fileStatuses,
      ...mockReturnUseFileUploader,
    });
    const { container } = render(<FileUploader {...commonProps} />);

    const input = container.getElementsByTagName('input')[0];
    fireEvent.change(input, {
      target: { files: [fakeFile] },
    });

    const clickButton = await screen.findByRole('button', {
      name: 'Upload 1 files',
    });

    fireEvent.click(clickButton);

    expect(uploadFileSpy).toBeCalledWith({
      completeCallback: expect.any(Function),
      errorCallback: expect.any(Function),
      file: fakeFile,
      fileName: fileName2,
      level: 'public',
      progressCallback: expect.any(Function),
    });
  });
  it('calls upload to pause when paused is clicked', async () => {
    const uploadTask = { pause: () => null } as any;
    const uploadTaskSpy = jest.spyOn(uploadTask, 'pause');
    const fileStatuses = [
      {
        percentage: 50,
        uploadTask,
        fileErrors: undefined,
        name: 'hello.png',
        file: fakeFile,
        fileState: 'loading' as any,
      },
    ];
    useFileUploaderSpy.mockReturnValue({
      fileStatuses,
      ...mockReturnUseFileUploader,
    });

    const { findByText } = render(
      <FileUploader {...commonProps} isPreviewerVisible={true} />
    );

    const button = await findByText('pause');
    await fireEvent.click(button);

    expect(uploadTaskSpy).toBeCalled();
  });
  it('calls resume when resume is clicked', async () => {
    const uploadTask = { pause: () => null, resume: () => null } as any;
    const uploadTaskSpy = jest.spyOn(uploadTask, 'resume');
    const fileStatuses = [
      {
        percentage: 50,
        uploadTask,
        fileErrors: undefined,
        name: 'hello.png',
        file: fakeFile,
        fileState: 'paused' as any,
      },
    ];
    useFileUploaderSpy.mockReturnValue({
      fileStatuses,
      ...mockReturnUseFileUploader,
    });

    const { findByText } = render(
      <FileUploader {...commonProps} isPreviewerVisible={true} />
    );

    const button = await findByText('Resume');
    await fireEvent.click(button);

    expect(uploadTaskSpy).toBeCalled();
  });
  it('updates the name from the fileName prop', async () => {
    uploadFileSpy.mockResolvedValue({} as never);
    const oldFileName = 'test.png';
    const updatedFileName = 'update.png';
    const fileStatuses = [
      {
        percentage: 0,
        uploadTask: undefined,
        fileErrors: undefined,
        name: oldFileName,
        file: fakeFile,
        fileState: null,
      },
    ];

    useFileUploaderSpy.mockReturnValue({
      fileStatuses,
      ...mockReturnUseFileUploader,
    });
    const { container } = render(
      <FileUploader {...commonProps} fileNames={[updatedFileName]} />
    );

    const input = container.getElementsByTagName('input')[0];
    fireEvent.change(input, {
      target: { files: [fakeFile] },
    });

    const clickButton = await screen.findByRole('button', {
      name: 'Upload 1 files',
    });

    fireEvent.click(clickButton);

    expect(uploadFileSpy).toBeCalledWith({
      completeCallback: expect.any(Function),
      errorCallback: expect.any(Function),
      file: fakeFile,
      fileName: updatedFileName,
      level: 'public',
      progressCallback: expect.any(Function),
    });
  });
  it('calls the errorCallback when there is an eror', async () => {
    const ERROR_MESSAGE = 'error!';
    uploadFileSpy.mockResolvedValue({} as never);

    const fileStatuses = [
      {
        percentage: 0,
        uploadTask: undefined,
        fileErrors: undefined,
        name: 'hello.png',
        file: fakeFile,
        fileState: null,
      },
    ];

    const setFileStatusMock = jest.fn();
    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses,
      setFileStatuses: setFileStatusMock,
    });
    render(<FileUploader {...commonProps} isPreviewerVisible={true} />);

    const clickButton = await screen.findByRole('button', {
      name: 'Upload 1 files',
    });

    uploadFileSpy.mockImplementation(
      ({
        completeCallback,
        errorCallback,
        file,
        fileName,
        level,
        progressCallback,
      }: any): any => {
        // simulate error
        errorCallback(ERROR_MESSAGE);
      }
    );
    await fireEvent.click(clickButton);

    expect(setFileStatusMock).toHaveBeenNthCalledWith(1, [
      {
        fileErrors: ERROR_MESSAGE,
        fileState: 'error',
      },
    ]);
  });
  it('calls the progressCallback during upload', async () => {
    const mockProgress = { loaded: 10, total: 100 };
    const percentage = Math.floor(
      (mockProgress.loaded / mockProgress.total) * 100
    );
    uploadFileSpy.mockResolvedValue({} as never);

    const fileStatuses = [
      {
        percentage: 0,
        uploadTask: undefined,
        fileErrors: undefined,
        name: 'hello.png',
        file: fakeFile,
        fileState: null,
      },
    ];

    const setFileStatusMock = jest.fn();
    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses,
      setFileStatuses: setFileStatusMock,
    });
    render(<FileUploader {...commonProps} isPreviewerVisible={true} />);

    const clickButton = await screen.findByRole('button', {
      name: 'Upload 1 files',
    });

    uploadFileSpy.mockImplementation(
      ({
        completeCallback,
        errorCallback,
        file,
        fileName,
        level,
        progressCallback,
      }: any): any => {
        // simulate progress callback
        progressCallback(mockProgress);
      }
    );
    await fireEvent.click(clickButton);

    expect(setFileStatusMock).toHaveBeenNthCalledWith(1, [
      { fileState: 'loading', percentage },
    ]);
  });
  it('calls the completeCallback after done uploading', async () => {
    const mockComplete = { key: 'mock-key' };
    uploadFileSpy.mockResolvedValue({} as never);

    const fileStatuses = [
      {
        percentage: 0,
        uploadTask: undefined,
        fileErrors: undefined,
        name: 'hello.png',
        file: fakeFile,
        fileState: null,
      },
    ];

    const onSuccessMock = jest.fn();

    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses,
    });
    render(
      <FileUploader
        {...commonProps}
        isPreviewerVisible={true}
        onSuccess={onSuccessMock}
      />
    );

    const clickButton = await screen.findByRole('button', {
      name: 'Upload 1 files',
    });

    uploadFileSpy.mockImplementation(
      ({
        completeCallback,
        errorCallback,
        file,
        fileName,
        level,
        progressCallback,
      }: any): any => {
        // simulate complete callback
        completeCallback(mockComplete);
      }
    );
    await fireEvent.click(clickButton);

    expect(onSuccessMock).toHaveBeenCalledWith(mockComplete);
  });
});
