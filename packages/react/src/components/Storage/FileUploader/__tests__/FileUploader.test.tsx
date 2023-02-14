import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { UploadTask } from '@aws-amplify/storage';

import * as UIModule from '@aws-amplify/ui';

import * as UseFileUploader from '../hooks/useFileUploader';
import { ComponentClassNames } from '../../../../primitives';

import { FileUploader } from '..';

type CompleteCallback = (event: { key: string }) => void;
type ErrorCallback = (error: string) => void;
type ProgressCallback = (progress: { loaded: number; total: number }) => void;

type UploadFileInput = {
  completeCallback?: CompleteCallback;
  errorCallback?: ErrorCallback;
  progressCallback?: ProgressCallback;
};

type MockSetFileStatuses = React.Dispatch<React.SetStateAction<any>>;

const uploadFileSpy = jest.spyOn(UIModule, 'uploadFile');
const useFileUploaderSpy = jest.spyOn(UseFileUploader, 'useFileUploader');
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
  accessLevel: 'public' as const,
  acceptedFileTypes: ['.png'],
  variation: 'drop' as const,
  isResumable: true,
};

const fileStatus = {
  percentage: 0,
  uploadTask: undefined,
  fileErrors: undefined,
  name: 'hello.png',
  file: fakeFile,
  fileState: null,
};

const uploadOneFile = 'Upload 1 file';

const uploadTask = { pause: () => null, resume: () => null } as UploadTask;

const setFileStatusMock = jest.fn((cb?: (params) => void) =>
  typeof cb === 'function' ? cb([{}]) : undefined
);

describe('File Uploader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('exists', () => {
    const { container } = render(<FileUploader {...commonProps} />);

    expect(container).toMatchSnapshot();
  });

  it('shows a button when variation is set to button', async () => {
    render(<FileUploader {...commonProps} variation="button" />);
    const button = await screen.findByRole('button');

    expect(button).toBeTruthy();
  });

  it('shows svg drop icon when variation is set to drop', () => {
    const { container } = render(<FileUploader {...commonProps} />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
  });

  it('will not show Previewer on empty file target', () => {
    const { container } = render(
      <FileUploader {...commonProps} variation="button" />
    );

    const input = container.getElementsByTagName('input')[0];
    fireEvent.change(input, {
      target: { files: [] },
    });
    const text = screen.queryByText(/files selected/);

    expect(text).not.toBeInTheDocument();
  });

  it('calls uploadFile with expected arguments', async () => {
    uploadFileSpy.mockResolvedValue({} as never);
    const { container } = render(<FileUploader {...commonProps} />);

    const input = container.getElementsByTagName('input')[0];
    fireEvent.change(input, {
      target: { files: [fakeFile] },
    });

    const clickButton = await screen.findByRole('button', {
      name: uploadOneFile,
    });

    fireEvent.click(clickButton);

    expect(uploadFileSpy).toBeCalledWith({
      completeCallback: undefined,
      errorCallback: expect.any(Function) as (e: Error) => void,
      file: fakeFile,
      fileName: fakeFile.name,
      level: 'public',
      isResumable: true,
      progressCallback: expect.any(Function) as ProgressCallback,
    });
  });

  it('skips files that are already uploaded', async () => {
    uploadFileSpy.mockResolvedValue({} as never);
    const fileName2 = 'hello2.png';
    const fileStatuses = [
      {
        ...fileStatus,
        percentage: 100,
        fileState: 'success' as const,
      },
      {
        ...fileStatus,
        name: fileName2,
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
      name: uploadOneFile,
    });

    fireEvent.click(clickButton);

    expect(uploadFileSpy).toBeCalledWith({
      completeCallback: undefined,
      errorCallback: expect.any(Function) as ErrorCallback,
      file: fakeFile,
      fileName: fileName2,
      level: 'public',
      isResumable: true,
      progressCallback: expect.any(Function) as ProgressCallback,
    });
  });

  it('calls upload to pause when paused is clicked', async () => {
    const uploadTaskSpy = jest.spyOn(uploadTask, 'pause');
    const fileStatuses = [
      {
        ...fileStatus,
        percentage: 50,
        uploadTask,
        fileState: 'loading' as const,
      },
    ];
    useFileUploaderSpy.mockReturnValue({
      fileStatuses,
      ...mockReturnUseFileUploader,
    });

    render(<FileUploader {...commonProps} isPreviewerVisible />);

    const button = await screen.findByText('pause');
    fireEvent.click(button);

    expect(uploadTaskSpy).toBeCalled();
  });

  it('calls resume when resume is clicked', async () => {
    const uploadTaskSpy = jest.spyOn(uploadTask, 'resume');
    const fileStatuses = [
      {
        ...fileStatus,
        percentage: 50,
        uploadTask,
        fileState: 'paused' as const,
      },
    ];
    useFileUploaderSpy.mockReturnValue({
      fileStatuses,
      ...mockReturnUseFileUploader,
    });

    render(<FileUploader {...commonProps} isPreviewerVisible />);

    const button = await screen.findByText('Resume');
    fireEvent.click(button);

    expect(uploadTaskSpy).toBeCalled();
  });

  it('calls the errorCallback when there is an eror', async () => {
    const ERROR_MESSAGE = 'error!';
    uploadFileSpy.mockResolvedValue({} as never);

    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses: [fileStatus],
      setFileStatuses: setFileStatusMock as MockSetFileStatuses,
    });
    render(<FileUploader {...commonProps} isPreviewerVisible />);

    const clickButton = await screen.findByRole('button', {
      name: uploadOneFile,
    });

    uploadFileSpy.mockImplementation(
      ({ errorCallback }: UploadFileInput): any => {
        // simulate error
        errorCallback?.(ERROR_MESSAGE);
      }
    );
    fireEvent.click(clickButton);

    expect(setFileStatusMock.mock.results[0].value).toEqual([
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

    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses: [fileStatus],
      setFileStatuses: setFileStatusMock as MockSetFileStatuses,
    });
    render(<FileUploader {...commonProps} isPreviewerVisible />);

    const clickButton = await screen.findByRole('button', {
      name: uploadOneFile,
    });

    uploadFileSpy.mockImplementation(
      ({ progressCallback }: UploadFileInput): any => {
        // simulate progress callback
        progressCallback?.(mockProgress);
      }
    );
    fireEvent.click(clickButton);

    expect(setFileStatusMock.mock.results[0].value).toEqual([
      { fileState: 'loading', percentage },
    ]);
  });

  it('calls the completeCallback after done uploading', async () => {
    const mockComplete = { key: 'mock-key' };
    uploadFileSpy.mockResolvedValue({} as never);

    const onSuccessMock = jest.fn();

    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses: [fileStatus],
    });
    render(
      <FileUploader
        {...commonProps}
        isPreviewerVisible
        onSuccess={onSuccessMock}
      />
    );

    const clickButton = await screen.findByRole('button', {
      name: uploadOneFile,
    });

    uploadFileSpy.mockImplementation(
      ({ completeCallback }: UploadFileInput): any => {
        // simulate complete callback
        completeCallback?.(mockComplete);
      }
    );
    fireEvent.click(clickButton);

    expect(onSuccessMock).toHaveBeenCalledWith(mockComplete);
  });

  it('clears all the files when clear all is clicked', async () => {
    uploadFileSpy.mockResolvedValue({} as never);

    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses: [fileStatus],
      setFileStatuses: setFileStatusMock as MockSetFileStatuses,
    });
    render(<FileUploader {...commonProps} isPreviewerVisible />);

    const clickButton = await screen.findByRole('button', {
      name: 'Clear all',
    });

    fireEvent.click(clickButton);

    expect(setFileStatusMock).toHaveBeenCalledWith([]);
  });

  it('removes the file when cancel file is clicked', () => {
    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses: [fileStatus],
      setFileStatuses: setFileStatusMock as MockSetFileStatuses,
    });

    const { container } = render(
      <FileUploader {...commonProps} isPreviewerVisible />
    );

    // click the cancel button for the file
    const button = container.querySelectorAll('button')[2];
    fireEvent.click(button);

    expect(setFileStatusMock).toHaveBeenCalledWith([]);
  });

  it('updates file name after clicking the pencil and editing name', () => {
    const newFileName = 'newFile.png';

    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses: [{ ...fileStatus, fileState: 'editing' }],
      setFileStatuses: setFileStatusMock as MockSetFileStatuses,
    });

    render(<FileUploader {...commonProps} isPreviewerVisible />);

    // click pencel icon
    const button = screen.getAllByRole('button')[0];
    fireEvent.click(button);
    // input file name box
    const input = screen.getByLabelText<HTMLInputElement>('file name');

    fireEvent.change(input, {
      target: { value: newFileName },
    });

    // click save button
    const saveButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(saveButton);

    expect(setFileStatusMock).toHaveBeenCalledWith([
      { ...fileStatus, name: newFileName },
    ]);
  });

  it('updates file name and checks extension shows error', () => {
    const badFileName = 'newFile.xls';

    useFileUploaderSpy.mockReturnValueOnce({
      ...mockReturnUseFileUploader,
      fileStatuses: [{ ...fileStatus, fileState: 'editing' }],
      setFileStatuses: setFileStatusMock as MockSetFileStatuses,
    });

    render(<FileUploader {...commonProps} isPreviewerVisible />);

    // click pencel icon
    const button = screen.getAllByRole('button')[0];
    fireEvent.click(button);
    // input file name box
    const input = screen.getByLabelText('file name');

    fireEvent.change(input, {
      target: { value: badFileName },
    });

    // click save button
    const saveButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(saveButton);

    expect(setFileStatusMock).toHaveBeenCalledWith([
      {
        ...fileStatus,
        name: badFileName,
        fileErrors: 'Extension not allowed',
        fileState: 'error',
      },
    ]);
  });

  it('updates file name and checks extension shows error if you save then cancel', () => {
    const badFileName = 'newFile.xls';

    const setFileStatuses = jest.fn();
    useFileUploaderSpy.mockReturnValueOnce({
      ...mockReturnUseFileUploader,
      fileStatuses: [{ ...fileStatus, fileState: 'editing' }],
      setFileStatuses,
    });

    render(<FileUploader {...commonProps} isPreviewerVisible />);

    // click pencel icon
    const button = screen.getAllByRole('button')[1];
    fireEvent.click(button);
    // input file name box
    const input = screen.getByLabelText('file name');

    fireEvent.change(input, {
      target: { value: badFileName },
    });

    // click save button
    const saveButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(saveButton);

    // click pencel icon again
    fireEvent.click(button);
    // click cancel button
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);

    expect(setFileStatuses).toHaveBeenCalledWith([
      {
        ...fileStatus,
        name: badFileName,
        fileErrors: 'Extension not allowed',
        fileState: 'error',
      },
    ]);
  });

  it.skip('shows the overridden Tracker component', async () => {
    // const UploadTracker = ({ name }) => <div>File Name: {name}</div>;

    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses: [fileStatus],
    });
    render(
      <FileUploader
        {...commonProps}
        // components={{ UploadTracker }}
        isPreviewerVisible
      />
    );

    expect(
      await screen.findByText(`File Name: ${fileStatus.name}`)
    ).toBeVisible();
  });

  it.skip('shows the overridden Previewer component', async () => {
    // const UploadPreviewer = ({ fileStatuses }) => (
    //   <div>Preview: {fileStatuses[0].name} </div>
    // );

    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses: [fileStatus],
    });
    render(
      <FileUploader
        {...commonProps}
        // components={{ UploadPreviewer }}
        isPreviewerVisible
      />
    );

    expect(
      await screen.findByText(`Preview: ${fileStatus.name}`)
    ).toBeVisible();
  });

  it('shows nothing in Tracker if showImages is false', () => {
    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses: [fileStatus],
    });

    const { container } = render(
      <FileUploader {...commonProps} showImages={false} isPreviewerVisible />
    );

    expect(
      container.querySelector(`.${ComponentClassNames.FileUploaderFileImage}`)
    ).toBeNull();
  });

  it('shows an image inside the tracker if showImages is true', () => {
    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses: [fileStatus],
    });
    const { container } = render(
      <FileUploader {...commonProps} showImages isPreviewerVisible />
    );

    expect(
      container.querySelector(`.${ComponentClassNames.FileUploaderFileImage}`)
    ).toBeVisible();
  });

  it('starts upload after file is selected if shouldAutoProceed is true', () => {
    useFileUploaderSpy.mockReturnValueOnce({
      ...mockReturnUseFileUploader,
      fileStatuses: [fileStatus],
    });

    const { container } = render(
      <FileUploader {...commonProps} shouldAutoProceed />
    );

    const input = container.getElementsByTagName('input')[0];
    fireEvent.change(input, {
      target: { files: [fakeFile] },
    });

    expect(uploadFileSpy).toBeCalledWith({
      completeCallback: undefined,
      errorCallback: expect.any(Function) as ErrorCallback,
      file: fakeFile,
      fileName: fakeFile.name,
      level: 'public',
      isResumable: true,
      progressCallback: expect.any(Function) as ProgressCallback,
    });
  });

  it('wont count uploaded files to max files error limit', async () => {
    const fileStatuses = [
      {
        ...fileStatus,
        percentage: 100,
        uploadTask,
        fileState: 'success' as const,
      },
      {
        ...fileStatus,
        percentage: 0,
        uploadTask,
        fileState: 'error' as const,
      },
    ];
    useFileUploaderSpy.mockReturnValue({
      fileStatuses,
      ...mockReturnUseFileUploader,
    });

    render(
      <FileUploader {...commonProps} maxFileCount={1} isPreviewerVisible />
    );

    const uploadFilesText = await screen.findByText(/Upload 1 file/);

    expect(uploadFilesText).toBeVisible();
  });

  it('will show max files error limit', async () => {
    const fileStatuses = [
      {
        ...fileStatus,
        percentage: 0,
        uploadTask,
        fileState: 'success' as const,
      },
      {
        ...fileStatus,
        percentage: 0,
        uploadTask,
        fileState: 'error' as const,
      },
    ];
    useFileUploaderSpy.mockReturnValue({
      fileStatuses,
      ...mockReturnUseFileUploader,
    });

    render(
      <FileUploader {...commonProps} maxFileCount={1} isPreviewerVisible />
    );

    const errorText = await screen.findByText(/Cannot choose more than 1/);

    expect(errorText).toBeVisible();
  });

  it('returns from the progressCallback with a zero byte file with success', async () => {
    const mockProgress = { loaded: 0, total: 0 };
    const percentage = 100;
    uploadFileSpy.mockResolvedValue({} as never);

    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses: [fileStatus],
      setFileStatuses: setFileStatusMock as MockSetFileStatuses,
    });
    render(<FileUploader {...commonProps} isPreviewerVisible />);

    const clickButton = await screen.findByRole('button', {
      name: uploadOneFile,
    });

    uploadFileSpy.mockImplementation(
      ({ progressCallback }: UploadFileInput): any => {
        // simulate progress callback
        progressCallback?.(mockProgress);
      }
    );
    fireEvent.click(clickButton);

    expect(setFileStatusMock.mock.results[0].value).toEqual([
      { fileState: 'success', percentage },
    ]);
  });

  it('will show correct singular form for files selected and upload files', async () => {
    uploadFileSpy.mockResolvedValue({} as never);
    const fileStatuses = [
      {
        ...fileStatus,
        percentage: 0,
        fileState: null,
      },
    ];

    useFileUploaderSpy.mockReturnValue({
      fileStatuses,
      ...mockReturnUseFileUploader,
    });
    render(<FileUploader {...commonProps} variation="button" />);

    expect(await screen.findByText(/file selected/)).toBeVisible();
    expect(await screen.findByText(/Upload 1 file/)).toBeVisible();
  });

  it('will show the correct singular form of file uploaded', async () => {
    uploadFileSpy.mockResolvedValue({} as never);
    const fileStatuses = [
      {
        ...fileStatus,
        percentage: 100,
        fileState: 'success' as const,
      },
    ];

    useFileUploaderSpy.mockReturnValue({
      fileStatuses,
      ...mockReturnUseFileUploader,
    });
    render(<FileUploader {...commonProps} />);

    expect(await screen.findByText(/file uploaded/)).toBeVisible();
  });

  it('will show the correct plural form of files uploaded', async () => {
    uploadFileSpy.mockResolvedValue({} as never);
    const fileStatuses = [
      {
        ...fileStatus,
        percentage: 100,
        fileState: 'success' as const,
      },
      {
        ...fileStatus,
        percentage: 100,
        fileState: 'success' as const,
      },
    ];

    useFileUploaderSpy.mockReturnValue({
      fileStatuses,
      ...mockReturnUseFileUploader,
    });
    render(<FileUploader {...commonProps} />);

    expect(await screen.findByText(/files uploaded/)).toBeVisible();
  });

  it('will show correct plural form for files selected and upload files', async () => {
    uploadFileSpy.mockResolvedValue({} as never);
    const fileStatuses = [
      {
        ...fileStatus,
        percentage: 0,
        fileState: null,
      },
      {
        ...fileStatus,
        percentage: 0,
        fileState: null,
      },
    ];

    useFileUploaderSpy.mockReturnValue({
      fileStatuses,
      ...mockReturnUseFileUploader,
    });
    render(<FileUploader {...commonProps} variation="button" />);

    expect(await screen.findByText(/files selected/)).toBeVisible();
    expect(await screen.findByText(/Upload 2 file/)).toBeVisible();
  });
});
