import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { CloseIconButton } from '../CloseIconButton';

const testId = 'closeIconButtonId';

describe('CloseIconButton component', () => {
  it('should render', () => {
    render(<CloseIconButton testId={testId} />);

    const closeIconButton = screen.getByTestId(testId);
    expect(closeIconButton.nodeName).toBe('BUTTON');
  });

  it('can render a classname', () => {
    const className = 'my-close-button';
    render(<CloseIconButton className={className} testId={testId} />);

    const closeIconButton = screen.getByTestId(testId);
    expect(closeIconButton.className).toContain(className);
  });
});
