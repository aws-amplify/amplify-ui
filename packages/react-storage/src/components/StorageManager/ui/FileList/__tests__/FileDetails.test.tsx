import * as React from 'react';
import { render } from '@testing-library/react';

import { ComponentClassNames } from '@aws-amplify/ui-react';

import { UploadDetails } from '../FileDetails';
import { UploadDetailsProps } from '../types';
import { humanFileSize } from '../../../utils';

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
        `${ComponentClassNames.StorageManagerFileMain}`
      )
    ).toHaveLength(1);

    expect(
      container.getElementsByClassName(
        `${ComponentClassNames.StorageManagerFileName}`
      )
    ).toHaveLength(1);

    expect(
      container.getElementsByClassName(
        `${ComponentClassNames.StorageManagerFileSize}`
      )
    ).toHaveLength(1);

    expect(await findByText(fileDetailsProps.displayName)).toBeVisible();
    expect(
      await findByText(humanFileSize(fileDetailsProps.fileSize!, true))
    ).toBeVisible();
  });
});
