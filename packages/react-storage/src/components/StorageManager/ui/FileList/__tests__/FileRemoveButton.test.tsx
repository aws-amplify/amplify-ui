import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ComponentClassName } from '@aws-amplify/ui';
import { IconsProvider, View } from '@aws-amplify/ui-react';

import { FileRemoveButton } from '../FileRemoveButton';
import { FileRemoveButtonProps } from '../types';

const onClick = jest.fn();
const fileRemoveButtonProps: FileRemoveButtonProps = {
  altText: 'Alt text',
  onClick: onClick,
};

describe('FileRemoveButton', () => {
  it('renders as expected', async () => {
    const { container, findByRole, findByText } = render(
      <FileRemoveButton {...fileRemoveButtonProps} />
    );

    const button = await findByRole('button');
    expect(button).toHaveClass(`${ComponentClassName.Button}--small`);

    const image = await findByText(fileRemoveButtonProps.altText);
    expect(image).toHaveClass('amplify-visually-hidden');

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should fire onClick function if the button is clicked on', async () => {
    const { findByRole } = render(
      <FileRemoveButton {...fileRemoveButtonProps} />
    );

    const button = await findByRole('button');
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders custom icons from IconProvider', () => {
    const { container } = render(
      <IconsProvider
        icons={{
          storageManager: {
            remove: <View testId="remove" />,
          },
        }}
      >
        <FileRemoveButton {...fileRemoveButtonProps} />
      </IconsProvider>
    );

    expect(screen.getByTestId('remove')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
