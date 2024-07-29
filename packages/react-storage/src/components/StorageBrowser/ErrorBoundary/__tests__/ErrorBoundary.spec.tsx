import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';

const ThrowErrorComponent: React.FC = () => {
  React.useEffect(() => {
    throw new Error('Test Error Boundary');
  }, []);

  return <div>This should throw an error</div>;
};

describe('ErrorBoundary', () => {
  it('should render the fallback component when an error is thrown', () => {
    // Mock implementation for console.error to prevent logging during tests
    jest.spyOn(console, 'error').mockImplementation(() => null);

    render(
      <ErrorBoundary>
        <ThrowErrorComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText('Something went wrong. Please try again.')
    ).toBeInTheDocument();
  });

  it('should render children when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <div>No error here</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('No error here')).toBeInTheDocument();
  });
});
