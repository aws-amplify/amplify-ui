import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { FileState } from '../FileState';
const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });

describe('FileState', () => {
  it('exists', async () => {
    const { container } = render(
      <FileState fileState="error" isLoading={false} errorMessage={''} />
    );

    expect(container).toMatchSnapshot();
  });
  it('displays loading message if isLoading is true and fileState is false', async () => {
    const { findByText } = render(
      <FileState fileState={null} isLoading={true} errorMessage={''} />
    );

    expect(await findByText('Loading')).toBeVisible();
  });
  it('displays paused message if fileState is paused', async () => {
    const { findByText } = render(
      <FileState fileState={'paused'} isLoading={false} errorMessage={''} />
    );

    expect(await findByText('Paused')).toBeVisible();
  });
  it('displays upload success message if fileState is in success', async () => {
    const { findByText } = render(
      <FileState fileState={'success'} isLoading={false} errorMessage={''} />
    );

    expect(await findByText('Uploaded successfully')).toBeVisible();
  });
  it('displays error message if fileState is in error', async () => {
    const error = 'error message';
    const { findByText } = render(
      <FileState fileState={'error'} isLoading={false} errorMessage={error} />
    );

    expect(await findByText(error)).toBeVisible();
  });
});
