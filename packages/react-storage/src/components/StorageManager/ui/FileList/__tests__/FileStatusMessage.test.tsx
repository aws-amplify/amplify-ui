import * as React from 'react';
import { render } from '@testing-library/react';

import { ComponentClassNames } from '@aws-amplify/ui-react';

import { FileStatusMessage } from '../FileStatusMessage';
import { FileStatusMessageProps } from '../types';
import { FileStatus } from '../../../types';

const uploadingText = 'Uploading...';
const uploadingPausedText = 'Uploading paused...';
const uploadSuccessful = 'Upload successful!';
const errorUploading = 'Error';
const defaultProps: FileStatusMessageProps = {
  status: FileStatus.UPLOADING,
  errorMessage: errorUploading,
  percentage: 50,
  getUploadingText: (percentage: number) => `${uploadingText} ${percentage}%`,
  getPausedText: () => uploadingPausedText,
  uploadSuccessfulText: uploadSuccessful,
};

describe('FileStatusMessage', () => {
  it('renders as expected when file is uploading', async () => {
    const { container, findByText } = render(
      <FileStatusMessage {...defaultProps} status={FileStatus.UPLOADING} />
    );

    expect(
      container.getElementsByClassName(
        `${ComponentClassNames.StorageManagerFileStatus}`
      )
    ).toHaveLength(1);
    expect(
      await findByText(`${uploadingText} ${defaultProps.percentage}%`)
    ).toBeVisible();
    expect(container).toMatchSnapshot();
  });

  it('renders as expected when file uploading is paused', async () => {
    const { container, findByText } = render(
      <FileStatusMessage {...defaultProps} status={FileStatus.PAUSED} />
    );

    expect(
      container.getElementsByClassName(
        `${ComponentClassNames.StorageManagerFileStatus}`
      )
    ).toHaveLength(1);
    expect(await findByText(uploadingPausedText)).toBeVisible();
    expect(container).toMatchSnapshot();
  });

  it('renders as expected when file is uploaded', async () => {
    const { container, findByText } = render(
      <FileStatusMessage {...defaultProps} status={FileStatus.UPLOADED} />
    );

    expect(
      container.getElementsByClassName(
        `${ComponentClassNames.StorageManagerFileStatus}`
      )
    ).toHaveLength(1);
    expect(await findByText(uploadSuccessful)).toBeVisible();
    expect(container).toMatchSnapshot();
  });

  it('renders as expected when there is an error uploading', async () => {
    const { container, findByText } = render(
      <FileStatusMessage {...defaultProps} status={FileStatus.ERROR} />
    );

    expect(
      container.getElementsByClassName(
        `${ComponentClassNames.StorageManagerFileStatus}`
      )
    ).toHaveLength(1);
    expect(await findByText(errorUploading)).toBeVisible();
    expect(container).toMatchSnapshot();
  });

  it('renders nothing when status is null', () => {
    const { container } = render(<FileStatusMessage {...defaultProps} />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <p
          class="amplify-text amplify-storagemanager__file__status"
        >
          Uploading... 50%
        </p>
      </div>
    `);
  });
});
