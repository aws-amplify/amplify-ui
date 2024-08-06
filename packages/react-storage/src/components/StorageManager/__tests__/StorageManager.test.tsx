import React from 'react';
import {
  fireEvent,
  render,
  waitFor,
  act,
  getByTestId,
} from '@testing-library/react';
import * as Storage from 'aws-amplify/storage';

import { ComponentClassName } from '@aws-amplify/ui';

import * as StorageHooks from '../hooks';
import {
  StorageManager,
  MISSING_REQUIRED_PROPS_MESSAGE,
  ACCESS_LEVEL_DEPRECATION_MESSAGE,
} from '../StorageManager';
import {
  StorageManagerProps,
  StorageManagerHandle,
  FileStatus,
} from '../types';
import { defaultStorageManagerDisplayText } from '../utils';

const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

const uploadDataSpy = jest
  .spyOn(Storage, 'uploadData')
  .mockImplementation((input) => ({
    cancel: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    state: 'SUCCESS',
    result: Promise.resolve({ key: input.key, data: input.data }),
  }));

const storeManagerProps: StorageManagerProps = {
  accessLevel: 'guest',
  maxFileCount: 100,
};

describe('StorageManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('behaves as expected with an accessLevel prop', () => {
    const { container, getByText } = render(
      <StorageManager {...storeManagerProps} />
    );
    expect(container).toMatchSnapshot();

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.StorageManagerDropZone}`
      )
    ).toHaveLength(1);

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.StorageManagerDropZoneText}`
      )
    ).toHaveLength(1);

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.StorageManagerDropZoneIcon}`
      )
    ).toHaveLength(1);

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.StorageManagerFilePicker}`
      )
    ).toHaveLength(1);

    expect(
      getByText(defaultStorageManagerDisplayText.browseFilesText)
    ).toBeVisible();
    expect(
      getByText(defaultStorageManagerDisplayText.dropFilesText)
    ).toBeVisible();

    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  it('behaves as expected with a path prop', () => {
    const { container, getByText } = render(
      <StorageManager maxFileCount={3} path={() => 'my-path'} />
    );
    expect(container).toMatchSnapshot();

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.StorageManagerDropZone}`
      )
    ).toHaveLength(1);

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.StorageManagerDropZoneText}`
      )
    ).toHaveLength(1);

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.StorageManagerDropZoneIcon}`
      )
    ).toHaveLength(1);

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.StorageManagerFilePicker}`
      )
    ).toHaveLength(1);

    expect(
      getByText(defaultStorageManagerDisplayText.browseFilesText)
    ).toBeVisible();
    expect(
      getByText(defaultStorageManagerDisplayText.dropFilesText)
    ).toBeVisible();

    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('renders as expected with autoUpload turned off', () => {
    const { getByText } = render(
      <StorageManager {...storeManagerProps} autoUpload={false} />
    );
    const hiddenInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    const mockFile = new File(['hello'], 'hello.png', { type: 'image/png' });
    fireEvent.change(hiddenInput, { target: { files: [mockFile] } });

    expect(
      getByText(defaultStorageManagerDisplayText.clearAllButtonText)
    ).toBeVisible();
    expect(
      getByText(defaultStorageManagerDisplayText.getSelectedFilesText(1))
    ).toBeVisible();
  });

  it('renders as expected with override display text', () => {
    const displayText = {
      ...defaultStorageManagerDisplayText,
      dropFilesText: 'Drag and drop files here, or click to select files',
      browseFilesText: 'Select Files',
    };
    const { getByText } = render(
      <StorageManager {...storeManagerProps} displayText={displayText} />
    );
    expect(
      getByText('Drag and drop files here, or click to select files')
    ).toBeVisible();
    expect(getByText('Select Files')).toBeVisible();
  });

  it('displays error message when file exceeds max file size', () => {
    const maxFileSize = 0;
    const { getByText } = render(
      <StorageManager {...storeManagerProps} maxFileSize={maxFileSize} />
    );
    const hiddenInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    expect(hiddenInput).toBeInTheDocument();

    const mockFile = new File(['hello'], 'hello.png', { type: 'image/png' });
    fireEvent.change(hiddenInput, { target: { files: [mockFile] } });

    expect(
      getByText(defaultStorageManagerDisplayText.getFileSizeErrorText('0 B'))
    ).toBeVisible();
  });

  it('displays error message when max file count is exceeded', () => {
    const maxFileCount = 1;
    const { getByText } = render(
      <StorageManager {...storeManagerProps} maxFileCount={maxFileCount} />
    );
    const hiddenInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    expect(hiddenInput).toBeInTheDocument();

    const mockFile = new File(['hello'], 'hello.png', { type: 'image/png' });
    const mockFile2 = new File(['hello2'], 'hello2.png', { type: 'image/png' });
    fireEvent.change(hiddenInput, { target: { files: [mockFile, mockFile2] } });

    expect(
      getByText(
        defaultStorageManagerDisplayText.getMaxFilesErrorText(maxFileCount)
      )
    ).toBeVisible();
  });

  it('calls onUploadSuccess callback when file is successfully uploaded', async () => {
    const onUploadSuccess = jest.fn();
    render(
      <StorageManager
        {...storeManagerProps}
        onUploadSuccess={onUploadSuccess}
      />
    );
    const hiddenInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    expect(hiddenInput).toBeInTheDocument();
    const file = new File(['file content'], 'file.txt', { type: 'text/plain' });
    fireEvent.change(hiddenInput, {
      target: { files: [file] },
    });

    // Wait for the file to be uploaded
    await waitFor(() => {
      expect(uploadDataSpy).toHaveBeenCalledWith({
        key: file.name,
        data: file,
        options: {
          accessLevel: 'guest',
          contentType: 'text/plain',
          onProgress: expect.any(Function),
        },
      });
      expect(onUploadSuccess).toHaveBeenCalledTimes(1);
    });
  });

  it('calls onUploadStart callback when file starts uploading', async () => {
    const onUploadStart = jest.fn();
    render(
      <StorageManager {...storeManagerProps} onUploadStart={onUploadStart} />
    );
    const hiddenInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    expect(hiddenInput).toBeInTheDocument();
    const file = new File(['file content'], 'file.txt', { type: 'text/plain' });
    fireEvent.change(hiddenInput, {
      target: { files: [file] },
    });

    // Wait for the file to be uploaded
    await waitFor(() => {
      expect(uploadDataSpy).toHaveBeenCalledWith({
        key: file.name,
        data: file,
        options: {
          accessLevel: 'guest',
          contentType: 'text/plain',
          onProgress: expect.any(Function),
        },
      });
      expect(onUploadStart).toHaveBeenCalledTimes(1);
    });
  });

  it('provides the correct file key on a remove file event before upload', () => {
    const onFileRemove = jest.fn();

    const { container } = render(
      <StorageManager
        {...storeManagerProps}
        autoUpload={false}
        onFileRemove={onFileRemove}
      />
    );

    const hiddenInput: HTMLInputElement = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    expect(hiddenInput).toBeInTheDocument();

    const file = new File(['file content'], 'file.txt', { type: 'text/plain' });

    fireEvent.change(hiddenInput, { target: { files: [file] } });

    expect(uploadDataSpy).not.toHaveBeenCalled();

    const removeButton = getByTestId(
      container,
      'storage-manager-remove-button'
    );
    expect(removeButton).toBeDefined();

    fireEvent.click(removeButton);

    expect(onFileRemove).toHaveBeenCalledTimes(1);
    expect(onFileRemove).toHaveBeenCalledWith({ key: file.name });
  });

  it('provides the correct file key on a remove file event after upload', async () => {
    const onFileRemove = jest.fn();

    const { container } = render(
      <StorageManager {...storeManagerProps} onFileRemove={onFileRemove} />
    );
    const hiddenInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    expect(hiddenInput).toBeInTheDocument();
    const file = new File(['file content'], 'file.txt', { type: 'text/plain' });
    fireEvent.change(hiddenInput, {
      target: { files: [file] },
    });

    // Wait for the file to be uploaded
    await waitFor(() => {
      expect(uploadDataSpy).toHaveBeenCalled();

      const removeButton = getByTestId(
        container,
        'storage-manager-remove-button'
      );
      expect(removeButton).toBeDefined();

      fireEvent.click(removeButton);

      expect(onFileRemove).toHaveBeenCalledTimes(1);
      expect(onFileRemove).toHaveBeenCalledWith({ key: file.name });
    });
  });

  it('provides the processed file key on a remove file event after upload when processFile is provided', async () => {
    const onFileRemove = jest.fn();

    const processedKey = 'processedKey';
    const processFile: StorageManagerProps['processFile'] = (input) => ({
      ...input,
      key: processedKey,
    });

    const { container } = render(
      <StorageManager
        {...storeManagerProps}
        onFileRemove={onFileRemove}
        processFile={processFile}
      />
    );

    const hiddenInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    expect(hiddenInput).toBeInTheDocument();
    const file = new File(['file content'], 'file.txt', { type: 'text/plain' });

    fireEvent.change(hiddenInput, { target: { files: [file] } });

    // Wait for the file to be uploaded
    await waitFor(() => {
      expect(uploadDataSpy).toHaveBeenCalled();

      const removeButton = getByTestId(
        container,
        'storage-manager-remove-button'
      );
      expect(removeButton).toBeDefined();

      fireEvent.click(removeButton);

      expect(onFileRemove).toHaveBeenCalledTimes(1);
      expect(onFileRemove).toHaveBeenCalledWith({ key: processedKey });
    });
  });

  it('provides the processed file key on a remove file event after upload when processFile is provided with a path function', async () => {
    const onFileRemove = jest.fn();

    const processedKey = 'processedKey';
    const processFile: StorageManagerProps['processFile'] = (input) => ({
      ...input,
      key: processedKey,
    });

    const { container } = render(
      <StorageManager
        {...storeManagerProps}
        onFileRemove={onFileRemove}
        processFile={processFile}
        path={() => 'my-path'}
        accessLevel={undefined}
      />
    );

    const hiddenInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    expect(hiddenInput).toBeInTheDocument();
    const file = new File(['file content'], 'file.txt', { type: 'text/plain' });

    fireEvent.change(hiddenInput, { target: { files: [file] } });

    // Wait for the file to be uploaded
    await waitFor(() => {
      expect(uploadDataSpy).toHaveBeenCalled();

      const removeButton = getByTestId(
        container,
        'storage-manager-remove-button'
      );
      expect(removeButton).toBeDefined();

      fireEvent.click(removeButton);

      expect(onFileRemove).toHaveBeenCalledTimes(1);
      expect(onFileRemove).toHaveBeenCalledWith({ key: processedKey });
    });
  });

  it('logs a warning if maxFileCount is zero', () => {
    render(<StorageManager {...storeManagerProps} maxFileCount={0} />);

    expect(warnSpy).toHaveBeenCalledTimes(2);
    expect(warnSpy.mock.calls[0][0]).toBe(MISSING_REQUIRED_PROPS_MESSAGE);
    expect(warnSpy.mock.calls[1][0]).toBe(ACCESS_LEVEL_DEPRECATION_MESSAGE);
  });

  it('logs a warning if provided an accessLevel prop', () => {
    render(<StorageManager {...storeManagerProps} maxFileCount={1} />);

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0][0]).toBe(ACCESS_LEVEL_DEPRECATION_MESSAGE);
  });

  it('should trigger hidden input onChange', async () => {
    const mockAddFiles = jest.fn();
    jest.spyOn(StorageHooks, 'useStorageManager').mockReturnValue({
      addFiles: mockAddFiles,
      files: [],
      status: FileStatus.QUEUED,
    } as unknown as StorageHooks.UseStorageManager);

    const { findByRole } = render(<StorageManager {...storeManagerProps} />);

    const filePickerButton = await findByRole('button');

    expect(filePickerButton).toBeInTheDocument();

    const hiddenInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    expect(hiddenInput).toBeInTheDocument();

    fireEvent.click(filePickerButton);

    expect(hiddenInput).toHaveValue('');

    const mockFile = new File(['hello'], 'hello.png', { type: 'image/png' });

    fireEvent.change(hiddenInput, { target: { files: [mockFile] } });

    expect(mockAddFiles).toHaveBeenCalledTimes(1);
    expect(mockAddFiles).toHaveBeenCalledWith({
      files: [mockFile],
      status: FileStatus.QUEUED,
      getFileErrorMessage: expect.any(Function),
    });
  });

  it('clears files when imperative handle clearFiles() is called', () => {
    const ref = React.createRef<StorageManagerHandle>();
    const mockAddFiles = jest.fn();
    const mockClearFiles = jest.fn();
    jest.spyOn(StorageHooks, 'useStorageManager').mockReturnValue({
      addFiles: mockAddFiles,
      clearFiles: mockClearFiles,
      files: [],
    } as unknown as StorageHooks.UseStorageManager);

    render(<StorageManager {...storeManagerProps} ref={ref} />);
    const hiddenInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    expect(hiddenInput).toBeInTheDocument();
    const file = new File(['file content'], 'file.txt', { type: 'text/plain' });
    fireEvent.change(hiddenInput, {
      target: { files: [file] },
    });

    expect(mockAddFiles).toHaveBeenCalledTimes(1);
    expect(mockAddFiles).toHaveBeenCalledWith({
      files: [file],
      status: FileStatus.QUEUED,
      getFileErrorMessage: expect.any(Function),
    });

    act(() => ref.current?.clearFiles());
    expect(mockClearFiles).toHaveBeenCalledTimes(1);
    expect(mockClearFiles).toHaveBeenCalledWith();
  });
});
