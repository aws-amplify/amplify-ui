import * as React from 'react';
import { render } from '@testing-library/react';

import { FileList } from '../FileList';
import { FileListProps } from '../types';
import { ComponentClassNames } from '../../../../../primitives/shared/constants';
import { FileStatus, StorageFile } from '../../types';
import { defaultStorageManagerDisplayText } from '../../displayText';

const mockFile: StorageFile = {
  id: 'test',
  name: '',
  status: FileStatus.UPLOADING,
  progress: 0,
  error: '',
  isImage: false,
};

const fileListProps: FileListProps = {
  displayText: defaultStorageManagerDisplayText,
  files: [mockFile],
  isResumable: false,
  onCancelUpload: jest.fn(),
  onDeleteUpload: jest.fn(),
  onPause: jest.fn(),
  onResume: jest.fn(),
  showThumbnails: false,
  hasMaxFilesError: false,
  maxFileCount: 0,
};

describe('FileList', () => {
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
  });

  it('renders an alert in case of error', () => {
    const { container } = render(
      <FileList {...fileListProps} hasMaxFilesError={true} />
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
});
