import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Backdrop } from '../Backdrop';

const testId = 'backdropId';

describe('Backdrop component', () => {
  it('should render', async () => {
    render(<Backdrop testId={testId}>children</Backdrop>);

    const backdrop = (await screen.findByTestId(testId)) as HTMLDivElement;
    expect(backdrop).toHaveClass('amplify-inappmessaging-backdrop');
  });
});
