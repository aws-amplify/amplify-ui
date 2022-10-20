import * as React from 'react';
import { act, render, screen } from '@testing-library/react';

import { UploaderButton } from '..';

describe('Uploader Button', () => {
  it('displays an upload button', async () => {
    const UPLOAD_TEXT = 'Upload file';
    await act(async () => {
      render(
        <UploaderButton
          multiple={false}
          acceptedFileTypes={['.png']}
          onUpload={() => ''}
        />
      );
    });

    expect(screen.getByText(UPLOAD_TEXT)).toBeVisible();
  });
});
