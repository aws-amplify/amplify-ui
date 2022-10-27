import * as React from 'react';
import { render } from '@testing-library/react';

import { Previewer } from '..';

describe('Previewer', () => {
  it('exists', async () => {
    const { container } = render(<Previewer />);

    expect(container).toBeTruthy();
  });
});
