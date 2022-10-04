import * as React from 'react';
import { render, screen } from '@testing-library/react';

import {
  FaceLivenessDetectorProvider,
  useFaceLivenessDetector,
} from '../FaceLivenessDetectorProvider';

const TestComponent: React.FC = () => {
  useFaceLivenessDetector();
  return <div>Some component</div>;
};

describe('FaceLivenessDetectorProvider', () => {
  const renderTestComponent = () =>
    render(
      <FaceLivenessDetectorProvider flowProps={undefined} service={undefined}>
        <TestComponent />
      </FaceLivenessDetectorProvider>
    );

  it('should render by default', () => {
    renderTestComponent();

    expect(screen.getByText('Some component')).toBeInTheDocument();
  });

  it('should throw error if used outside the provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    expect(() => render(<TestComponent />)).toThrow();
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});
