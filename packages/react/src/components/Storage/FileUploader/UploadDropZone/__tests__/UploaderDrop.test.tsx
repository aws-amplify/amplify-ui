import * as React from 'react';
import { render } from '@testing-library/react';

import { UploadDropZone } from '..';

describe('UploaderDrop', () => {
  it('exists', async () => {
    const { container } = render(
      <UploadDropZone
        inDropZone={false}
        onDragEnter={() => ''}
        onDragLeave={() => ''}
        onDragOver={() => ''}
        onDragStart={() => ''}
        onDrop={() => ''}
      />
    );

    expect(container).toBeTruthy();
  });
});
