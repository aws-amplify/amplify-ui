import * as React from 'react';
import { render } from '@testing-library/react';

import { Tracker } from '..';

describe('Tracker', () => {
  it('exists', async () => {
    const { container } = render(<Tracker />);

    expect(container).toBeTruthy();
  });
});
