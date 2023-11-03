import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { ComponentClassName } from '@aws-amplify/ui';
import { IconsProvider, View } from '@aws-amplify/ui-react';

import { FileStatusMessage } from '../FileStatusMessage';
import { FileStatusMessageProps } from '../types';
import { FileStatus } from '../../../types';

const uploadingText = 'Uploading...';
const uploadingPausedText = 'Uploading paused...';
const uploadSuccessful = 'Upload successful!';
const errorUploading = 'Error';
const defaultProps: Omit<FileStatusMessageProps, 'status'> = {
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
        `${ComponentClassName.StorageManagerFileStatus}`
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
        `${ComponentClassName.StorageManagerFileStatus}`
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
        `${ComponentClassName.StorageManagerFileStatus}`
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
        `${ComponentClassName.StorageManagerFileStatus}`
      )
    ).toHaveLength(1);
    expect(await findByText(errorUploading)).toBeVisible();
    expect(container).toMatchSnapshot();
  });

  it('renders nothing when status is queued', () => {
    const { container } = render(
      <FileStatusMessage {...defaultProps} status={FileStatus.QUEUED} />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders custom icons from IconProvider', () => {
    const { container } = render(
      <IconsProvider
        icons={{
          storageManager: {
            success: <View testId="success" />,
            error: <View testId="error" />,
          },
        }}
      >
        <FileStatusMessage {...defaultProps} status={FileStatus.ERROR} />
        <FileStatusMessage {...defaultProps} status={FileStatus.UPLOADED} />
      </IconsProvider>
    );

    expect(screen.getByTestId('success')).toBeInTheDocument();
    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
