import * as React from 'react';
import { render } from '@testing-library/react';

import { FileListHeader, FileListHeaderProps } from '../FileListHeader';
import { defaultStorageManagerDisplayText } from '../../displayText';
import { ComponentClassNames } from '../../../../../primitives/shared/constants';

const headerProps: FileListHeaderProps = {
  fileCount: 2,
  remainingFilesCount: 1,
  displayText: defaultStorageManagerDisplayText,
  allUploadsSuccessful: false,
};

describe('FileListHeader', () => {
  it('renders as expected when uploads are in progress', async () => {
    const { container, findByText } = render(
      <FileListHeader {...headerProps} />
    );

    expect(
      container.getElementsByClassName(
        `${ComponentClassNames.StorageManagerPreviewerText}`
      )
    ).toHaveLength(1);

    expect(
      await findByText(
        headerProps.displayText.getRemainingFilesText(
          headerProps.remainingFilesCount
        )
      )
    ).toBeVisible();

    expect(container).toMatchSnapshot();
  });

  it('renders as expected when uploads are successful', async () => {
    const { container, findByText } = render(
      <FileListHeader {...headerProps} allUploadsSuccessful />
    );

    expect(
      await findByText(
        headerProps.displayText.getFilesUploadedText(headerProps.fileCount)
      )
    ).toBeVisible();

    expect(container).toMatchSnapshot();
  });
});
