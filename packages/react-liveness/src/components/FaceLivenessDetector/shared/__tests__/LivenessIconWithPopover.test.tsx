import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { LivenessIconWithPopover } from '../LivenessIconWithPopover';
import { act } from 'react-test-renderer';

describe('LivenessIconWithPopover', () => {
  it('should render the component content appropriately', () => {
    const infoText = 'Test info text';

    render(
      <LivenessIconWithPopover
        labelText="More information about photosensitivity"
        headingText="Photosensitivity warning"
      >
        {infoText}
      </LivenessIconWithPopover>
    );

    const popover = screen.queryByTestId('popover-icon');
    expect(screen.queryByTestId('popover-icon')).toBeInTheDocument();
    act(() => {
      popover?.click();
    });
    expect(screen.queryByTestId('popover-text')).toBeInTheDocument();
    expect(screen.getByText(infoText)).toBeInTheDocument();
  });
});
