import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Toast } from '../Toast';

describe('Toast', () => {
  it('should render the component content appropriately', () => {
    render(<Toast>{'anything'}</Toast>);

    expect(screen.getByText('anything')).toBeInTheDocument();
    expect(screen.queryByTestId('toast-icon')).not.toBeInTheDocument();
  });

  it('should render the success variation', () => {
    render(<Toast variation="success">{'success'}</Toast>);

    expect(screen.getByText('success')).toBeInTheDocument();
    expect(screen.getByTestId('toast-icon')).toBeInTheDocument();
  });

  it('should render the success variation', () => {
    render(<Toast variation="error">{'failure'}</Toast>);

    expect(screen.getByText('failure')).toBeInTheDocument();
    expect(screen.getByTestId('toast-icon')).toBeInTheDocument();
  });
});
