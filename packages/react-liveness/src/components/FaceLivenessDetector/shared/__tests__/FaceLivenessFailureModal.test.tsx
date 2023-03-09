import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { FaceLivenessFailureModal } from '../FaceLivenessFailureModal';

describe('FaceLivenessFailureModal', () => {
  it('should render the component content appropriately', () => {
    render(<FaceLivenessFailureModal onRetry={() => {}} />);

    expect(screen.getByText('Check unsuccessful')).toBeInTheDocument();
  });
});
