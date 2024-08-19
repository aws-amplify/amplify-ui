import React from 'react';
import { render, screen } from '@testing-library/react';

import { ControlProvider } from '../../../context/controls';

import { AddFilesControl } from '../AddFiles';
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
    const input: HTMLInputElement = screen.getByTestId('FileInput');

    user.click(button);
    await user.upload(input, file);

    expect(input.files).not.toBeNull();
    expect(input.files).toHaveLength(1);

    expect(input.files![0]).toStrictEqual(file);
    expect(input.files!.item(0)).toStrictEqual(file);
  });
});
