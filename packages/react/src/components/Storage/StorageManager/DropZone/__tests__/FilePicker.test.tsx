import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { defaultStorageManagerDisplayText } from '../../displayText';
import { classNameModifier } from '../../../../../primitives/shared/utils';
import { ComponentClassNames } from '../../../../../primitives';
import { FilePicker } from '../FilePicker';
import userEvent from '@testing-library/user-event';

describe('FilePicker', () => {
  it('renders correctly', () => {
    const { container } = render(
      <FilePicker
        acceptedFileTypes={[`image/*`, `.pdf`]}
        allowMultipleFiles={true}
        displayText={defaultStorageManagerDisplayText}
        onFileChange={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('shows correct classname', async () => {
    const testId = 'dropzone';
    render(
      <FilePicker
        acceptedFileTypes={[`image/*`, `.pdf`]}
        allowMultipleFiles={true}
        displayText={defaultStorageManagerDisplayText}
        onFileChange={() => {}}
      />
    );

    const filePickerButton = await screen.findByRole('button');
    expect(filePickerButton).toHaveClass(
      ComponentClassNames.StorageManagerDropZoneButton
    );
  });

  // Note: We are unable to write unit tests for onFileChange handler.
  // When we fire a click event on the hidden input it would normally open
  // the browser dialog and only after choosing a file would the onFileChange handler
  // be called. This makes it impossible to test onFileChange in a unit testing environment.
});
