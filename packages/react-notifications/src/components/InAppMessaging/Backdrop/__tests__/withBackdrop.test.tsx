import React from 'react';
import { render, screen } from '@testing-library/react';

import { BACKDROP_TEST_ID } from '../Backdrop';
import { withBackdrop } from '../withBackdrop';

type BackdropComponentType = {
  text: string;
};
const Component = ({ text }: BackdropComponentType) => <>{text}</>;
const COMPONENT_TEXT = 'component text';

describe('withBackdrop', () => {
  it('should render', () => {
    const ComponentWithBackdrop = withBackdrop(Component);
    render(<ComponentWithBackdrop text={COMPONENT_TEXT} />);

    const backdrop = screen.getByTestId(BACKDROP_TEST_ID);
    const content = screen.getByText(COMPONENT_TEXT);
    expect(backdrop).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(backdrop).toHaveClass('amplify-inappmessaging-backdrop');
  });
});
