import * as React from 'react';
import { render } from '@testing-library/react';

import { UploaderButton } from '..';

describe('Uploader Button', () => {
  it('exists', async () => {
    const { container } = render(
      <UploaderButton
        multiple={false}
        acceptedFileTypes={['.png']}
        onClick={() => ''}
      />
    );

    expect(container).toBeTruthy();
  });
});
