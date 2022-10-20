import * as React from 'react';
import { act, render, screen } from '@testing-library/react';

import { FileUploader } from '..';
import { useFileUploader } from '@aws-amplify/ui-react-core';
jest.mock('@aws-amplify/ui-react-core');

describe('File Uploader', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useFileUploader as jest.Mock).mockReturnValue({
      files: [],
      setFiles: () => '',
      setShowPreviewer: () => '',
      showPreviewer: false,
      getDropEvents: null,
      inDropZone: false,
    });
  });
  it('shows drag text when variation is drop', async () => {
    const DRAG_TEXT = /drag file/;
    await act(async () => {
      render(
        <FileUploader
          level="public"
          acceptedFileTypes={['.png']}
          variation="drop"
        />
      );
    });

    expect(screen.getByText(DRAG_TEXT)).toBeVisible();
  });
});
