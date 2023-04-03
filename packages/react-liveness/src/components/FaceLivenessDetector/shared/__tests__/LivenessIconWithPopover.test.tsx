import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { LivenessIconWithPopover } from '../LivenessIconWithPopover';

describe('LivenessIconWithPopover', () => {
  it('should render the component content appropriately', () => {
    const infoText = 'Test info text';

    render(<LivenessIconWithPopover>{infoText}</LivenessIconWithPopover>);

    const popover = screen.queryByTestId('popover-icon');
    expect(screen.queryByTestId('popover-icon')).toBeInTheDocument();
    popover?.click();
    expect(screen.queryByTestId('popover-text')).toBeInTheDocument();
    expect(screen.getByText(infoText)).toBeInTheDocument();
  });
});
