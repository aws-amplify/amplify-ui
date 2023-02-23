import * as React from 'react';
import { render } from '@testing-library/react';

import { UploadDropZone } from '..';
import { classNameModifier } from '../../../../../primitives/shared/utils';
import { ComponentClassNames } from '../../../../../primitives';
import { defaultFileUploaderDisplayText } from '../../displayText';

const commonProps = {
  displayText: defaultFileUploaderDisplayText,
  onDragEnter: () => '',
  onDragLeave: () => '',
  onDragOver: () => '',
  onDragStart: () => '',
  onDrop: () => '',
};

describe('UploaderDrop', () => {
  it('exists', () => {
    const { container } = render(
      <UploadDropZone {...commonProps} inDropZone={false} />
    );

    expect(container).toMatchSnapshot();
  });
  it('shows correct class when inDropZone is true', () => {
    const { container } = render(
      <UploadDropZone {...commonProps} inDropZone />
    );
    const activeClass = container.getElementsByClassName(
      classNameModifier(ComponentClassNames.FileUploaderDropZone, 'active')
    )[0];

    expect(activeClass).toBeVisible();
  });
});
