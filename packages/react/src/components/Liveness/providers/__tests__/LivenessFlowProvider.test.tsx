import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { LivenessFlowProvider, useLivenessFlow } from '../LivenessFlowProvider';

const TestComponent: React.FC = () => {
  useLivenessFlow();
  return <div>Some component</div>;
};

describe('LivenessFlowProvider', () => {
  const renderTestComponent = () =>
    render(
      <LivenessFlowProvider flowProps={undefined} service={undefined}>
        <TestComponent />
      </LivenessFlowProvider>
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
