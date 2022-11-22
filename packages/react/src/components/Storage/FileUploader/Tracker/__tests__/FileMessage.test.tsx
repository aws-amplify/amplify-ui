import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { FileMessage } from '../FileMessage';
const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });

describe('FileState', () => {
  it('exists', async () => {
    const { container } = render(
      <FileMessage fileState="error" errorMessage={''} />
    );

    expect(container).toMatchSnapshot();
  });
  it('displays loading message if fileState is loading', async () => {
    const { findByText } = render(
      <FileMessage fileState={'loading'} percentage={10} errorMessage={''} />
    );

    expect(await findByText('Uploading: 10%')).toBeVisible();
  });
  it('displays paused message if fileState is paused', async () => {
    const { findByText } = render(
      <FileMessage fileState={'paused'} percentage={10} errorMessage={''} />
    );

    expect(await findByText('Paused: 10%')).toBeVisible();
  });
  it('displays upload success message if fileState is in success', async () => {
    const { findByText } = render(
      <FileMessage fileState={'success'} errorMessage={''} />
    );

    expect(await findByText('Uploaded successfully')).toBeVisible();
  });
  it('displays error message if fileState is in error', async () => {
    const error = 'error message';
    const { findByText } = render(
      <FileMessage fileState={'error'} errorMessage={error} />
    );

    expect(await findByText(error)).toBeVisible();
  });
});
