import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { FileUploader } from '..';

describe('File Uploader', () => {
  it('exists', async () => {
    const comp = render(
      <FileUploader
        level="public"
        acceptedFileTypes={['.png']}
        variation="drop"
      />
    );

    expect(comp.container).toBeTruthy();
  });
  it('shows a button when variation is set to button', async () => {
    render(
      <FileUploader
        level="public"
        acceptedFileTypes={['.png']}
        variation="button"
      />
    );
    const button = await screen.findByRole('button');

    expect(button).toBeTruthy();
  });
  it('shows svg drop icon when variation is set to drop', async () => {
    const { container } = render(
      <FileUploader
        level="public"
        acceptedFileTypes={['.png']}
        variation="drop"
      />
    );
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
  });
});
