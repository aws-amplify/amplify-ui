import * as React from 'react';
import { render } from '@testing-library/react';

import { Tracker } from '..';

describe('Tracker', () => {
  it('exists', async () => {
    const FILE_NAME = 'FILENAME1';
    const file = new File(['test'], FILE_NAME, {
      type: 'image/jpg',
    });
    const { container } = render(
      <Tracker
        file={file}
        percentage={0}
        onCancel={() => ''}
        onPause={() => ''}
        onResume={() => ''}
        isPaused={false}
      />
    );

    expect(container).toBeTruthy();
  });
});
