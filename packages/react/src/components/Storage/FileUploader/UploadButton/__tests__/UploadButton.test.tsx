import * as React from 'react';
import { render } from '@testing-library/react';

import { UploadButton } from '..';

describe('Uploader Button', () => {
  it('exists', () => {
    const { container } = render(<UploadButton onClick={() => null} />);

    expect(container).toBeTruthy();
  });
});
