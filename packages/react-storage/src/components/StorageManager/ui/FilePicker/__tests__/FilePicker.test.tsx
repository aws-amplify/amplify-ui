import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { ComponentClassNames } from '@aws-amplify/ui-react';

import { FilePicker } from '../FilePicker';

const children = 'Pick a file, any file.';
const onClick = jest.fn();

describe('FilePicker', () => {
  it('renders correctly', () => {
    const { container } = render(
      <FilePicker onClick={onClick}>{children}</FilePicker>
    );

    expect(container).toMatchSnapshot();
  });

  it('shows correct classname', async () => {
    render(<FilePicker onClick={onClick}>{children}</FilePicker>);

    const filePickerButton = await screen.findByRole('button');
    expect(filePickerButton).toHaveClass(
      ComponentClassNames.StorageManagerFilePicker
    );
  });
});
