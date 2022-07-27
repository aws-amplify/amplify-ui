import React from 'react';
import { render, screen } from '@testing-library/react';

import { BACKDROP_TEST_ID } from '../Backdrop';
import { withBackdrop } from '../withBackdrop';

const Component = ({ title }) => <>{title}</>;

describe('withBackdrop', () => {
  it('should render', async () => {
    const ComponentWithBackdrop = withBackdrop(Component);
    render(<ComponentWithBackdrop title="component" />);

    const backdrop = await screen.findByTestId(BACKDROP_TEST_ID);
    const dialog = await screen.findByRole('dialog');
    expect(backdrop).toBeInTheDocument();
    expect(dialog).toBeInTheDocument();
    expect(backdrop).toHaveClass('amplify-inappmessaging-backdrop');
    expect(dialog).toHaveClass('amplify-inappmessaging-backdrop-content');
  });
});
