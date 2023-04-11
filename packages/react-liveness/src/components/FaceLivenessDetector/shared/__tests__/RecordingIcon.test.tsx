import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { RecordingIcon } from '../RecordingIcon';

describe('RecordingIcon', () => {
  it('should render the component content appropriately', () => {
    const indicatorText = 'Rec';

    render(<RecordingIcon>{indicatorText}</RecordingIcon>);

    expect(screen.getByTestId('rec-icon')).toBeInTheDocument();
    expect(screen.getByText(indicatorText)).toBeInTheDocument();
  });
});
