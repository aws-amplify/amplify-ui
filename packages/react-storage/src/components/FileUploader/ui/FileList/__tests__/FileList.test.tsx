import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { UploadDataOutput } from 'aws-amplify/storage';
import { ComponentClassName } from '@aws-amplify/ui';

import { FileList } from '../FileList';
import { FileListProps } from '../types';
import { FileStatus, StorageFile } from '../../../types';
import { defaultFileUploaderDisplayText } from '../../../utils';

const mockFile: StorageFile = {
  id: 'test',
  status: FileStatus.UPLOADING,
  progress: 0,
  error: '',
  isImage: false,
  key: '',
  uploadTask: {} as UploadDataOutput,
};

const mockOnCancelUpload = jest.fn();
const mockOnDeleteUpload = jest.fn();
const mockOnResume = jest.fn();
const mockOnPause = jest.fn();

const fileListProps: FileListProps = {
  displayText: defaultFileUploaderDisplayText,
  files: [mockFile],
  isResumable: false,
  onCancelUpload: mockOnCancelUpload,
  onDeleteUpload: mockOnDeleteUpload,
  onPause: mockOnPause,
  onResume: mockOnResume,
  showThumbnails: false,
  hasMaxFilesError: false,
  maxFileCount: 0,
};

describe('FileList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders as expected', () => {
    const { container } = render(<FileList {...fileListProps} />);

    expect(container).toMatchSnapshot();

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.FileUploaderFileList}`
      )
    ).toHaveLength(1);

    expect(
      container.getElementsByClassName(`${ComponentClassName.FileUploaderFile}`)
    ).toHaveLength(fileListProps.files.length);

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.FileUploaderFileStatus}`
      )
    ).toHaveLength(1);
  });

  it('renders as expected when upload is resumable', () => {
    const { container, getByText } = render(
      <FileList {...fileListProps} isResumable />
    );

    expect(container).toMatchSnapshot();

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.FileUploaderFileList}`
      )
    ).toHaveLength(1);

    expect(
      container.getElementsByClassName(`${ComponentClassName.FileUploaderFile}`)
    ).toHaveLength(fileListProps.files.length);

    expect(
      getByText(defaultFileUploaderDisplayText.pauseButtonText)
    ).toBeInTheDocument();
  });

  it('renders an alert in case of error', () => {
    const { container } = render(
      <FileList {...fileListProps} hasMaxFilesError />
    );

    expect(container).toMatchSnapshot();

    expect(
      container.getElementsByClassName(`${ComponentClassName.Alert}--error`)
    ).toHaveLength(1);
  });

  it('renders nothing when there are no files', () => {
    const { container } = render(<FileList {...fileListProps} files={[]} />);
    expect(container).toMatchSnapshot();
  });

  it('should call onDeleteUpload when remove button is clicked', () => {
    const { getByText } = render(<FileList {...fileListProps} />);
    const removeButton = getByText('Remove file');
    fireEvent.click(removeButton);
    expect(mockOnDeleteUpload).toHaveBeenCalledTimes(1);
  });

  it('should call onPause when pause button is clicked', () => {
    const { getByText } = render(<FileList {...fileListProps} isResumable />);
    const pauseButton = getByText(
      defaultFileUploaderDisplayText.pauseButtonText
    );
    fireEvent.click(pauseButton);
    expect(mockOnPause).toHaveBeenCalledTimes(1);
  });
});
