import React from 'react';
import { render, screen } from '@testing-library/react';

import { BACKDROP_TEST_ID } from '../Backdrop';
import { withBackdrop } from '../withBackdrop';

const Component = ({ title }) => <>{title}</>;
const COMPONENT_TITLE = 'component title';

describe('withBackdrop', () => {
  it('should render', async () => {
    const ComponentWithBackdrop = withBackdrop(Component);
    render(<ComponentWithBackdrop title={COMPONENT_TITLE} />);

    const backdrop = await screen.findByTestId(BACKDROP_TEST_ID);
    const content = await screen.findByTitle(COMPONENT_TITLE);
    expect(backdrop).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(backdrop).toHaveClass('amplify-inappmessaging-backdrop');
  });
});
