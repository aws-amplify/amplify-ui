import * as React from 'react';
import { render } from '@testing-library/react';

import { ComponentClassName } from '@aws-amplify/ui';

import { FileControlProps } from '../types';
import { FileControl } from '../FileControl';
import { FileStatus } from '../../../types';
import { defaultFileUploaderDisplayText } from '../../../utils/displayText';

const fileControlProps: FileControlProps = {
  displayText: defaultFileUploaderDisplayText,
  displayName: 'fileName',
  errorMessage: '',
  isImage: false,
  isResumable: false,
  isUploading: false,
  loaderIsDeterminate: false,
  onRemove: jest.fn(),
  onPause: jest.fn(),
  onResume: jest.fn(),
  progress: 0,
  showThumbnails: false,
  status: FileStatus.UPLOADING,
  thumbnailUrl: '',
};

describe('FileControl', () => {
  it('renders as expected when file is uploading', () => {
    const { container } = render(<FileControl {...fileControlProps} />);

    expect(container).toMatchSnapshot();

    expect(
      container.getElementsByClassName(`${ComponentClassName.FileUploaderFile}`)
    ).toHaveLength(1);

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.FileUploaderFileWrapper}`
      )
    ).toHaveLength(1);

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.FileUploaderFileStatus}`
      )
    ).toHaveLength(1);

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.FileUploaderLoader}`
      )
    ).toHaveLength(1);

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.FileUploaderFileImage}`
      )
    ).toHaveLength(0);
  });

  it('renders as expected when uploading is paused', () => {
    const { container } = render(
      <FileControl {...fileControlProps} status={FileStatus.PAUSED} />
    );

    expect(container).toMatchSnapshot();

    expect(
      container.getElementsByClassName(`${ComponentClassName.FileUploaderFile}`)
    ).toHaveLength(1);

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.FileUploaderFileStatus}`
      )
    ).toHaveLength(1);

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.FileUploaderLoader}`
      )
    ).toHaveLength(0);
  });

  it('renders thumbnails', () => {
    const { container } = render(
      <FileControl {...fileControlProps} showThumbnails />
    );

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.FileUploaderFileImage}`
      )
    ).toHaveLength(1);

    expect(container).toMatchSnapshot();
  });

  it('should default to showThumbnails being true', () => {
    //@ts-expect-error
    fileControlProps.showThumbnails = undefined;

    const { container } = render(<FileControl {...fileControlProps} />);

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.FileUploaderFileImage}`
      )
    ).toHaveLength(1);

    expect(container).toMatchSnapshot();
  });
});
