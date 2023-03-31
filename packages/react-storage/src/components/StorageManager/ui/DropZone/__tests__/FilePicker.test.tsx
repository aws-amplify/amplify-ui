import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { ComponentClassNames } from '@aws-amplify/ui-react';

import { FilePicker } from '../FilePicker';
import { defaultStorageManagerDisplayText } from '../../../utils/displayText';

describe('FilePicker', () => {
  it('renders correctly', () => {
    const { container } = render(
      <FilePicker
        acceptedFileTypes={[`image/*`, `.pdf`]}
        allowMultipleFiles
        displayText={defaultStorageManagerDisplayText}
        onFileChange={() => {}}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('shows correct classname', async () => {
    render(
      <FilePicker
        acceptedFileTypes={[`image/*`, `.pdf`]}
        allowMultipleFiles
        displayText={defaultStorageManagerDisplayText}
        onFileChange={() => {}}
      />
    );

    const filePickerButton = await screen.findByRole('button');
    expect(filePickerButton).toHaveClass(
      ComponentClassNames.StorageManagerDropZoneButton
    );
  });

  it('should trigger hidden input onChange', async () => {
    const mockOnFileChange = jest.fn();
    const { findByRole } = render(
      <FilePicker
        acceptedFileTypes={[`image/*`, `.pdf`]}
        allowMultipleFiles
        displayText={defaultStorageManagerDisplayText}
        onFileChange={mockOnFileChange}
      />
    );

    const filePickerButton = await findByRole('button');

    const hiddenInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    expect(hiddenInput).toBeInTheDocument();

    fireEvent.click(filePickerButton);
    expect(hiddenInput).toHaveValue('');

    const mockFile = new File(['hello'], 'hello.png', { type: 'image/png' });
    fireEvent.change(hiddenInput, { target: { files: [mockFile] } });
    expect(mockOnFileChange).toHaveBeenCalledTimes(1);
    expect(mockOnFileChange).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'change',
      })
    );
  });
});
