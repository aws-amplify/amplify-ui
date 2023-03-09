import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { RecordingIcon } from '../RecordingIcon';

describe('RecordingIcon', () => {
  it('should render the component content appropriately', () => {
    render(<RecordingIcon />);

    expect(screen.getByTestId('rec-icon')).toBeInTheDocument();
    expect(screen.getByText('Rec')).toBeInTheDocument();
  });
});
