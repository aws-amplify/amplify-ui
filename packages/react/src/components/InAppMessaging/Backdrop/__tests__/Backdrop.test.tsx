import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Backdrop, BACKDROP_TEST_ID } from '../Backdrop';

describe('Backdrop component', () => {
  it('should render', async () => {
    render(<Backdrop />);

    const backdrop = await screen.findByTestId(BACKDROP_TEST_ID);
    expect(backdrop).toBeInTheDocument();
    expect(backdrop).toHaveClass('amplify-inappmessaging-backdrop');
  });
});
