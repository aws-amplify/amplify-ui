import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { ComponentClassName } from '@aws-amplify/ui';
import { IconsProvider, View } from '@aws-amplify/ui-react';

import { FileStatusMessage } from '../FileStatusMessage';
import { FileStatusMessageProps } from '../types';
import { FileStatus } from '../../../../FileUploader/types';

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
            success: <View as="span" testId="success" />,
            error: <View as="span" testId="error" />,
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

  it('announces upload progress when status is uploading', () => {
    render(
      <FileStatusMessage {...defaultProps} status={FileStatus.UPLOADING} />
    );

    const announcement = screen.getByRole('status');
    expect(announcement).toHaveTextContent(
      'File upload status changed: Uploading 50%'
    );
  });

  it('announces paused status with progress', () => {
    render(<FileStatusMessage {...defaultProps} status={FileStatus.PAUSED} />);

    const announcement = screen.getByRole('status');
    expect(announcement).toHaveTextContent(
      'File upload status changed: Paused at 50%'
    );
  });

  it('announces successful upload completion', () => {
    render(
      <FileStatusMessage {...defaultProps} status={FileStatus.UPLOADED} />
    );

    const announcement = screen.getByRole('status');
    expect(announcement).toHaveTextContent(
      'File upload status changed: Upload completed successfully'
    );
  });

  it('announces error status', () => {
    render(<FileStatusMessage {...defaultProps} status={FileStatus.ERROR} />);

    const announcement = screen.getByRole('status');
    expect(announcement).toHaveTextContent('File upload status changed: Error');
  });

  it('has no announcement for queued status', () => {
    render(<FileStatusMessage {...defaultProps} status={FileStatus.QUEUED} />);

    const announcement = screen.getByRole('status');
    expect(announcement).toHaveTextContent(
      'File upload status changed: Queued'
    );
  });
});
