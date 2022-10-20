import * as React from 'react';
import { act, render, screen } from '@testing-library/react';

import { Previewer } from '..';

describe('Previewer', () => {
  it('displays an upload button', async () => {
    const UPLOAD_TEXT = 'Upload Files';
    await act(async () => {
      render(
        <Previewer
          fileNames={[]}
          level="public"
          files={[]}
          onClose={() => ''}
        />
      );
    });

    expect(screen.getByText(UPLOAD_TEXT)).toBeVisible();
  });
});
