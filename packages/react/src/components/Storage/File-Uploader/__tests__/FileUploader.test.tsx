import * as React from 'react';
import { render } from '@testing-library/react';

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
});
