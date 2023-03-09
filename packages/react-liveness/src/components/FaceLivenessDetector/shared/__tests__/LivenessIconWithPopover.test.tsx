import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { LivenessIconWithPopover } from '../LivenessIconWithPopover';

describe('LivenessIconWithPopover', () => {
  it('should render the component content appropriately', () => {
    render(<LivenessIconWithPopover />);

    const popover = screen.queryByTestId('popover-icon');
    expect(screen.queryByTestId('popover-icon')).toBeInTheDocument();
    popover?.click();
    expect(screen.queryByTestId('popover-text')).toBeInTheDocument();
  });
});
