import * as React from 'react';
import { render } from '@testing-library/react';

import { UploadDropZone } from '..';
import { classNameModifier } from '../../../../../primitives/shared/utils';
import { ComponentClassNames } from '../../../../../primitives';

describe('UploaderDrop', () => {
  it('exists', () => {
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

    expect(container).toMatchSnapshot();
  });
  it('shows correct class when inDropZone is true', () => {
    const { container } = render(
      <UploadDropZone
        inDropZone
        onDragEnter={() => ''}
        onDragLeave={() => ''}
        onDragOver={() => ''}
        onDragStart={() => ''}
        onDrop={() => ''}
      />
    );
    const activeClass = container.getElementsByClassName(
      classNameModifier(ComponentClassNames.FileUploaderDropZone, 'active')
    )[0];

    expect(activeClass).toBeVisible();
  });
});
