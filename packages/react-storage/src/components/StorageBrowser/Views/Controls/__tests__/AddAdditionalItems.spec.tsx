import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';

import { ControlProvider } from '../../../context/controls';

import { AddFilesControl, AddFolderControl } from '../AddAdditionalItems';
import userEvent from '@testing-library/user-event';

describe('AddFilesControl', () => {
  it('renders a `AddFilesControl`', () => {
    render(
      <ControlProvider>
        <AddFilesControl disable={false} />
      </ControlProvider>
    );
    const toggle = screen.getByRole('button', { name: 'Add Files' });
    expect(toggle).toBeInTheDocument();
  });

  it('opens the file picker when clicked and uses the file selection dialog', async () => {
    const user = userEvent.setup();
    const file = new File([''], 'hello.png', { type: 'image/png' });

    render(
      <ControlProvider>
        <AddFilesControl disable={false} />
      </ControlProvider>
    );

    const button = screen.getByRole('button', { name: 'Add Files' });
    const input: HTMLInputElement = screen.getByTestId('amplify-file-select');

    user.click(button);
    await user.upload(input, file);

    expect(input.files).not.toBeNull();
    expect(input.files).toHaveLength(1);

    expect(input.files![0]).toStrictEqual(file);
    expect(input.files!.item(0)).toStrictEqual(file);
  });
});

describe('AddFolderControl', () => {
  it('renders a `AddFolderControl`', () => {
    render(
      <ControlProvider>
        <AddFolderControl disable={false} />
      </ControlProvider>
    );
    const toggle = screen.getByRole('button', { name: 'Add Folder' });
    expect(toggle).toBeInTheDocument();
  });

  it('opens the file picker when clicked and uses the file selection dialog', async () => {
    const user = userEvent.setup();

    const files = [
      new File(['content1'], 'folder1/file1.txt', { type: 'text/plain' }),
      new File(['content2'], 'folder1/file2.txt', { type: 'text/plain' }),
      new File(['content3'], 'folder1/subfolder/file3.txt', {
        type: 'text/plain',
      }),
    ];

    render(
      <ControlProvider>
        <AddFolderControl disable={false} />
      </ControlProvider>
    );

    const button = screen.getByRole('button', { name: 'Add Folder' });
    const input: HTMLInputElement = screen.getByTestId('amplify-file-select');

    await act(async () => {
      user.click(button);
      await user.upload(input, files);
    });

    waitFor(() => {
      expect(input.files).toHaveLength(files.length);
    });
  });
});
