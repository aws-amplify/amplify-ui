import * as React from 'react';
import { render } from '@testing-library/react';

import { FileStatusMessage } from '../FileStatusMessage';
import { FileState } from '../../types';
import { defaultFileUploaderDisplayText } from '../../displayText';

const commonProps: {
  uploadSuccessfulText;
  getUploadingText;
  getPausedText;
} = defaultFileUploaderDisplayText;

describe('UploadMessage', () => {
  it('exists', async () => {
    const { container } = render(
      <FileStatusMessage
        {...commonProps}
        fileState={FileState.ERROR}
        errorMessage={''}
      />
    );

    expect(container).toMatchSnapshot();
  });
  it('displays loading message if fileState is loading', async () => {
    const { findByText } = render(
      <FileStatusMessage
        {...commonProps}
        fileState={FileState.LOADING}
        percentage={10}
        errorMessage={''}
      />
    );

    expect(await findByText('Uploading: 10%')).toBeVisible();
  });
  it('displays paused message if fileState is paused', async () => {
    const { findByText } = render(
      <FileStatusMessage
        {...commonProps}
        fileState={FileState.PAUSED}
        percentage={10}
        errorMessage={''}
      />
    );

    expect(await findByText('Paused: 10%')).toBeVisible();
  });
  it('displays upload success message if fileState is in success', async () => {
    const { findByText } = render(
      <FileStatusMessage
        {...commonProps}
        fileState={FileState.SUCCESS}
        errorMessage={''}
      />
    );

    expect(await findByText('Uploaded successfully')).toBeVisible();
  });
  it('displays error message if fileState is in error', async () => {
    const error = 'error message';
    const { findByText } = render(
      <FileStatusMessage
        {...commonProps}
        fileState={FileState.ERROR}
        errorMessage={error}
      />
    );

    expect(await findByText(error)).toBeVisible();
  });
});
