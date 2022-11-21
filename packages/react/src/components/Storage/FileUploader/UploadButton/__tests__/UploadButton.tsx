import * as React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { UploadButton } from '..';
const ref = {
  current: {
    info: jest.fn(),
  },
} as unknown as React.MutableRefObject<HTMLInputElement>;

describe('Uploader Button', () => {
  it('exists', () => {
    const { container } = render(
      <UploadButton
        hasMultipleFiles={false}
        acceptedFileTypes={['.png']}
        onFileChange={() => null}
      />
    );

    expect(container).toBeTruthy();
  });

  it('accepts a file for upload', async () => {
    render(
      <UploadButton
        hasMultipleFiles={false}
        acceptedFileTypes={['.png']}
        onFileChange={() => null}
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
