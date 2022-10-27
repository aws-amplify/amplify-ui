import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { UploaderButton } from '..';

describe('Uploader Button', () => {
  it('exists', () => {
    const { container } = render(
      <UploaderButton
        multiple={false}
        acceptedFileTypes={['.png']}
        onFileChange={() => ''}
      />
    );

    expect(container).toBeTruthy();
  });

  it('accepts a file for upload', async () => {
    render(
      <UploaderButton
        multiple={false}
        acceptedFileTypes={['.png']}
        onFileChange={() => ''}
      />
    );
    const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });
    const input = document.getElementsByTagName('input')[0];

    await waitFor(() => {
      fireEvent.change(input, {
        target: { files: [fakeFile] },
      });
    });

    expect(input.files[0].name).toBe('hello.png');
  });
});
