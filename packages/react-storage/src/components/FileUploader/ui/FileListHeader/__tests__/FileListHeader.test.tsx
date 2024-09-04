import * as React from 'react';
import { render } from '@testing-library/react';

import { ComponentClassName } from '@aws-amplify/ui';

import { FileListHeader, FileListHeaderProps } from '../FileListHeader';
import { defaultFileUploaderDisplayText } from '../../../utils/displayText';

const headerProps: FileListHeaderProps = {
  fileCount: 2,
  remainingFilesCount: 1,
  displayText: defaultFileUploaderDisplayText,
  allUploadsSuccessful: false,
};

describe('FileListHeader', () => {
  it('renders as expected when uploads are in progress', async () => {
    const { container, findByText } = render(
      <FileListHeader {...headerProps} />
    );

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.FileUploaderPreviewerText}`
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
