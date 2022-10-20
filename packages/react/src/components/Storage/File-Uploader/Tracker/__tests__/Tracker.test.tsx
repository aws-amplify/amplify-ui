import * as React from 'react';
import { act, render, screen } from '@testing-library/react';

import { Tracker } from '..';

describe('Tracker', () => {
  it('displays file name', async () => {
    const FILE_NAME = 'FILENAME1';
    const file = new File(['test'], FILE_NAME, {
      type: 'image/jpg',
    });
    await act(async () => {
      render(
        <Tracker
          file={file}
          percentage={0}
          onCancel={() => ''}
          onPause={() => ''}
          onResume={() => ''}
          isPaused={false}
        />
      );
    });

    expect(screen.getByText(FILE_NAME)).toBeVisible();
  });
});
