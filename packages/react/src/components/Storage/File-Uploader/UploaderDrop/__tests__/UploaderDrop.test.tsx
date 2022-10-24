import * as React from 'react';
import { render } from '@testing-library/react';

import { UploaderDrop } from '..';

describe('UploaderDrop', () => {
  it('exists', async () => {
    const { container } = render(
      <UploaderDrop inDropZone={false} getDropEvents={undefined} />
    );

    expect(container).toBeTruthy();
  });
});
