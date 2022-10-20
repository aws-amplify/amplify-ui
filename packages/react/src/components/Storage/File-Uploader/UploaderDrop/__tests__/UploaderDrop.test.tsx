import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { UploaderDrop } from '..';

describe('UploaderDrop', () => {
  it('appears', async () => {
    const { container } = render(
      <UploaderDrop inDropZone={false} getDropEvents={undefined} />
    );

    expect(container.getElementsByClassName('amplify-card').length).toBe(1);
  });
});
