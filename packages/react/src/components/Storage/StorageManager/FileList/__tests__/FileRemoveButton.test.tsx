import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FileRemoveButton } from '../FileRemoveButton';
import { FileRemoveButtonProps } from '../types';
import { ComponentClassNames } from '../../../../../primitives/shared/constants';

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
    expect(button).toHaveClass(`${ComponentClassNames.Button}--small`);

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
    userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
