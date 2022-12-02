import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import * as UseHooks from '../hooks/useFileUploader';
import { FileUploader } from '..';
import * as UIModule from '@aws-amplify/ui';
import { act } from 'react-dom/test-utils';
import { ComponentClassNames } from '../../../../primitives';
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
  accessLevel: 'public' as any,
  acceptedFileTypes: ['.png'],
  variation: 'drop' as any,
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

const uploadOneFile = 'Upload 1 files';

describe('File Uploader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('exists', async () => {
    const { container } = render(<FileUploader {...commonProps} />);

    expect(container).toMatchSnapshot();
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
    const { container } = render(
      <FileUploader {...commonProps} variation="button" />
    );

    const input = container.getElementsByTagName('input')[0];
    fireEvent.change(input, {
      target: { files: [] },
    });
    const text = await screen.queryByText(/files selected/);

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
      name: uploadOneFile,
    });

    fireEvent.click(clickButton);

    expect(uploadFileSpy).toBeCalledWith({
      completeCallback: undefined,
      errorCallback: expect.any(Function),
      file: fakeFile,
      fileName: fakeFile.name,
      level: 'public',
      isResumable: true,
      progressCallback: expect.any(Function),
    });
  });
  it('skips files that are already uploaded', async () => {
    uploadFileSpy.mockResolvedValue({} as never);
    const fileName2 = 'hello2.png';
    const fileStatuses = [
      {
        ...fileStatus,
        percentage: 100,
        fileState: 'success' as any,
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
      errorCallback: expect.any(Function),
      file: fakeFile,
      fileName: fileName2,
      level: 'public',
      isResumable: true,
      progressCallback: expect.any(Function),
    });
  });
  it('calls upload to pause when paused is clicked', async () => {
    const uploadTask = { pause: () => null, resume: () => null } as any;
    const uploadTaskSpy = jest.spyOn(uploadTask, 'pause');
    const fileStatuses = [
      {
        ...fileStatus,
        percentage: 50,
        uploadTask,
        fileState: 'loading' as any,
      },
    ];
    useFileUploaderSpy.mockReturnValue({
      fileStatuses,
      ...mockReturnUseFileUploader,
    });

    render(<FileUploader {...commonProps} isPreviewerVisible={true} />);

    const button = await screen.findByText('pause');
    await fireEvent.click(button);

    expect(uploadTaskSpy).toBeCalled();
  });
  it('calls resume when resume is clicked', async () => {
    const uploadTask = { pause: () => null, resume: () => null } as any;
    const uploadTaskSpy = jest.spyOn(uploadTask, 'resume');
    const fileStatuses = [
      {
        ...fileStatus,
        percentage: 50,
        uploadTask,
        fileState: 'paused' as any,
      },
    ];
    useFileUploaderSpy.mockReturnValue({
      fileStatuses,
      ...mockReturnUseFileUploader,
    });

    render(<FileUploader {...commonProps} isPreviewerVisible={true} />);

    const button = await screen.findByText('Resume');
    await fireEvent.click(button);

    expect(uploadTaskSpy).toBeCalled();
  });
  it('calls the errorCallback when there is an eror', async () => {
    const ERROR_MESSAGE = 'error!';
    uploadFileSpy.mockResolvedValue({} as never);

    const fileStatuses = [fileStatus];

    const setFileStatusMock = jest.fn((callback: any) => {
      return callback([{}]);
    });
    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses,
      setFileStatuses: setFileStatusMock,
    });
    render(<FileUploader {...commonProps} isPreviewerVisible={true} />);

    const clickButton = await screen.findByRole('button', {
      name: uploadOneFile,
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

    const fileStatuses = [fileStatus];

    const setFileStatusMock = jest.fn((callback: any) => {
      return callback([{}]);
    });
    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses,
      setFileStatuses: setFileStatusMock,
    });
    render(<FileUploader {...commonProps} isPreviewerVisible={true} />);

    const clickButton = await screen.findByRole('button', {
      name: uploadOneFile,
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

    expect(setFileStatusMock.mock.results[0].value).toEqual([
      { fileState: 'loading', percentage },
    ]);
  });
  it('calls the completeCallback after done uploading', async () => {
    const mockComplete = { key: 'mock-key' };
    uploadFileSpy.mockResolvedValue({} as never);

    const fileStatuses = [fileStatus];

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
      name: uploadOneFile,
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
  it('clears all the files when clear all is clicked', async () => {
    uploadFileSpy.mockResolvedValue({} as never);

    const fileStatuses = [fileStatus];

    const setFileStatusMock = jest.fn();
    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses,
      setFileStatuses: setFileStatusMock,
    });
    render(<FileUploader {...commonProps} isPreviewerVisible={true} />);

    const clickButton = await screen.findByRole('button', {
      name: 'Clear all',
    });

    await fireEvent.click(clickButton);

    expect(setFileStatusMock).toHaveBeenCalledWith([]);
  });
  it('removes the file when cancel file is clicked', async () => {
    const fileStatuses = [fileStatus];
    const setFileStatusMock = jest.fn();
    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses,
      setFileStatuses: setFileStatusMock,
    });

    const { container } = render(
      <FileUploader {...commonProps} isPreviewerVisible={true} />
    );

    // click the cancel button for the file
    const button = await container.querySelectorAll('button')[2];
    await fireEvent.click(button);

    expect(setFileStatusMock).toHaveBeenCalledWith([]);
  });
  it('updates file name after clicking the pencil and editing name', async () => {
    const newFileName = 'newFile.png';
    const setFileStatusMock = jest.fn();
    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      setFileStatuses: setFileStatusMock,
      fileStatuses: [{ ...fileStatus, fileState: 'editing' }],
    });

    await act(async () => {
      render(<FileUploader {...commonProps} isPreviewerVisible={true} />);
    });

    // click pencel icon
    const button = await screen.getAllByRole('button')[1];
    await fireEvent.click(button);
    // input file name box
    const input = (await screen.getByLabelText(
      'file name'
    )) as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: newFileName },
    });

    // click save button
    const saveButton = await screen.getByRole('button', { name: 'Save' });
    await fireEvent.click(saveButton);

    expect(setFileStatusMock).toHaveBeenCalledWith([
      { ...fileStatus, name: newFileName },
    ]);
  });
  it('updates file name and checks extension shows error', async () => {
    const badFileName = 'newFile.xls';
    const setFileStatusMock = jest.fn();
    useFileUploaderSpy.mockReturnValueOnce({
      ...mockReturnUseFileUploader,
      setFileStatuses: setFileStatusMock,
      fileStatuses: [{ ...fileStatus, fileState: 'editing' }],
    });

    await act(async () => {
      render(<FileUploader {...commonProps} isPreviewerVisible={true} />);
    });

    // click pencel icon
    const button = await screen.getAllByRole('button')[1];
    await fireEvent.click(button);
    // input file name box
    const input = (await screen.getByLabelText(
      'file name'
    )) as HTMLInputElement;

    await fireEvent.change(input, {
      target: { value: badFileName },
    });

    // click save button
    const saveButton = await screen.getByRole('button', { name: 'Save' });
    await fireEvent.click(saveButton);

    expect(setFileStatusMock).toHaveBeenCalledWith([
      {
        ...fileStatus,
        name: badFileName,
        fileErrors: 'Extension not allowed',
        fileState: 'error',
      },
    ]);
  });
  it('updates file name and checks extension shows error if you save then cancel', async () => {
    const badFileName = 'newFile.xls';
    const setFileStatusMock = jest.fn();
    useFileUploaderSpy.mockReturnValueOnce({
      ...mockReturnUseFileUploader,
      setFileStatuses: setFileStatusMock,
      fileStatuses: [{ ...fileStatus, fileState: 'editing' }],
    });

    await act(async () => {
      render(<FileUploader {...commonProps} isPreviewerVisible={true} />);
    });

    // click pencel icon
    const button = await screen.getAllByRole('button')[1];
    await fireEvent.click(button);
    // input file name box
    const input = (await screen.getByLabelText(
      'file name'
    )) as HTMLInputElement;

    await fireEvent.change(input, {
      target: { value: badFileName },
    });

    // click save button
    const saveButton = await screen.getByRole('button', { name: 'Save' });
    await fireEvent.click(saveButton);

    // click pencel icon again
    await fireEvent.click(button);
    // click cancel button
    const cancelButton = await screen.getByRole('button', { name: 'Cancel' });
    await fireEvent.click(cancelButton);

    expect(setFileStatusMock).toHaveBeenCalledWith([
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

    const fileStatuses = [fileStatus];
    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses,
    });
    render(
      <FileUploader
        {...commonProps}
        // components={{ UploadTracker }}
        isPreviewerVisible={true}
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
    const fileStatuses = [fileStatus];
    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses,
    });
    render(
      <FileUploader
        {...commonProps}
        // components={{ UploadPreviewer }}
        isPreviewerVisible={true}
      />
    );

    expect(
      await screen.findByText(`Preview: ${fileStatuses[0].name}`)
    ).toBeVisible();
  });
  it('shows nothing in Tracker if showImages is false', async () => {
    const fileStatuses = [fileStatus];
    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses,
    });
    const { container } = render(
      <FileUploader
        {...commonProps}
        showImages={false}
        isPreviewerVisible={true}
      />
    );

    expect(
      container.querySelector(`.${ComponentClassNames.FileUploaderFileImage}`)
    ).toBeNull();
  });
  it('shows an image inside the tracker if showImages is true', async () => {
    const fileStatuses = [fileStatus];
    useFileUploaderSpy.mockReturnValue({
      ...mockReturnUseFileUploader,
      fileStatuses,
    });
    const { container } = render(
      <FileUploader
        {...commonProps}
        showImages={true}
        isPreviewerVisible={true}
      />
    );

    expect(
      container.querySelector(`.${ComponentClassNames.FileUploaderFileImage}`)
    ).toBeVisible();
  });
  it('starts upload after file is selected if shouldAutoProceed is true', async () => {
    const fileStatuses = [fileStatus];
    useFileUploaderSpy.mockReturnValueOnce({
      ...mockReturnUseFileUploader,
      fileStatuses,
    });

    const { container } = render(
      <FileUploader {...commonProps} shouldAutoProceed={true} />
    );

    const input = container.getElementsByTagName('input')[0];
    fireEvent.change(input, {
      target: { files: [fakeFile] },
    });

    expect(uploadFileSpy).toBeCalledWith({
      completeCallback: undefined,
      errorCallback: expect.any(Function),
      file: fakeFile,
      fileName: fakeFile.name,
      level: 'public',
      isResumable: true,
      progressCallback: expect.any(Function),
    });
  });
  it('wont count uploaded files to max files error limit', async () => {
    const uploadTask = { pause: () => null, resume: () => null } as any;
    const fileStatuses = [
      {
        ...fileStatus,
        percentage: 100,
        uploadTask,
        fileState: 'success' as any,
      },
      {
        ...fileStatus,
        percentage: 0,
        uploadTask,
        fileState: '' as any,
      },
    ];
    useFileUploaderSpy.mockReturnValue({
      fileStatuses,
      ...mockReturnUseFileUploader,
    });

    render(
      <FileUploader {...commonProps} maxFiles={1} isPreviewerVisible={true} />
    );

    const uploadFilesText = await screen.findByText(/Upload 1 files/);

    expect(uploadFilesText).toBeVisible();
  });
  it('will show max files error limit', async () => {
    const uploadTask = { pause: () => null, resume: () => null } as any;
    const fileStatuses = [
      {
        ...fileStatus,
        percentage: 0,
        uploadTask,
        fileState: '' as any,
      },
      {
        ...fileStatus,
        percentage: 0,
        uploadTask,
        fileState: '' as any,
      },
    ];
    useFileUploaderSpy.mockReturnValue({
      fileStatuses,
      ...mockReturnUseFileUploader,
    });

    render(
      <FileUploader {...commonProps} maxFiles={1} isPreviewerVisible={true} />
    );

    const errorText = await screen.findByText(/Over Max files/);

    expect(errorText).toBeVisible();
  });
});
