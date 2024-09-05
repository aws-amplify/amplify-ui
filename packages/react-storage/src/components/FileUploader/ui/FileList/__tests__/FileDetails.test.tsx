import * as React from 'react';
import { render } from '@testing-library/react';

import { ComponentClassName, humanFileSize } from '@aws-amplify/ui';

import { UploadDetails } from '../FileDetails';
import { UploadDetailsProps } from '../types';

const fileDetailsProps: UploadDetailsProps = {
  displayName: 'Test',
  fileSize: 100,
};

describe('FileDetails', () => {
  it('renders as expected', async () => {
    const { container, findByText } = render(
      <UploadDetails {...fileDetailsProps} />
    );

    expect(container).toMatchSnapshot();

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.FileUploaderFileMain}`
      )
    ).toHaveLength(1);

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.FileUploaderFileName}`
      )
    ).toHaveLength(1);

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.FileUploaderFileSize}`
      )
    ).toHaveLength(1);

    expect(await findByText(fileDetailsProps.displayName)).toBeVisible();
    expect(
      await findByText(humanFileSize(fileDetailsProps.fileSize!, true))
    ).toBeVisible();
  });
});
