import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { UploadTask } from '@aws-amplify/storage';
import { ComponentClassNames } from '@aws-amplify/ui-react';

import { FileList } from '../FileList';
import { FileListProps } from '../types';
import { FileStatus, StorageFile } from '../../../types';
import { defaultStorageManagerDisplayText } from '../../../utils';

const mockFile: StorageFile = {
  id: 'test',
  status: FileStatus.UPLOADING,
  progress: 0,
  error: '',
  isImage: false,
  key: '',
  uploadTask: {} as UploadTask,
};

const mockOnCancelUpload = jest.fn();
const mockOnDeleteUpload = jest.fn();
const mockOnResume = jest.fn();
const mockOnPause = jest.fn();

const fileListProps: FileListProps = {
  displayText: defaultStorageManagerDisplayText,
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
        `${ComponentClassNames.StorageManagerFileList}`
      )
    ).toHaveLength(1);

    expect(
      container.getElementsByClassName(
        `${ComponentClassNames.StorageManagerFile}`
      )
    ).toHaveLength(fileListProps.files.length);

    expect(
      container.getElementsByClassName(
        `${ComponentClassNames.StorageManagerFileStatus}`
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
        `${ComponentClassNames.StorageManagerFileList}`
      )
    ).toHaveLength(1);

    expect(
      container.getElementsByClassName(
        `${ComponentClassNames.StorageManagerFile}`
      )
    ).toHaveLength(fileListProps.files.length);

    expect(
      getByText(defaultStorageManagerDisplayText.pauseText)
    ).toBeInTheDocument();
  });

  it('renders an alert in case of error', () => {
    const { container } = render(
      <FileList {...fileListProps} hasMaxFilesError />
    );

    expect(container).toMatchSnapshot();

    expect(
      container.getElementsByClassName(`${ComponentClassNames.Alert}--error`)
    ).toHaveLength(1);
  });

  it('renders nothing when there are no files', () => {
    const { container } = render(<FileList {...fileListProps} files={[]} />);
    expect(container).toMatchInlineSnapshot(`<div />`);
  });

  it('should call onDeleteUpload when remove button is clicked', () => {
    const { getByText } = render(<FileList {...fileListProps} />);
    const removeButton = getByText('Remove file');
    fireEvent.click(removeButton);
    expect(mockOnDeleteUpload).toHaveBeenCalledTimes(1);
  });

  it('should call onPause when pause button is clicked', () => {
    const { getByText } = render(<FileList {...fileListProps} isResumable />);
    const pauseButton = getByText(defaultStorageManagerDisplayText.pauseText);
    fireEvent.click(pauseButton);
    expect(mockOnPause).toHaveBeenCalledTimes(1);
  });
});
