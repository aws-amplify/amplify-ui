import * as React from 'react';
import { render, prettyFormat } from '@testing-library/react';

import { LivenessFlowProvider } from '../providers';
import { LivenessFlowProps } from '../LivenessFlow';

export function renderWithLivenessProvider(ui: JSX.Element) {
  const mockFlowProps: LivenessFlowProps = {
    sessionId: 'sessionId',
    clientActionDocument: 'clientActionDocument',
    onGetLivenessDetection: jest.fn(),
  };
  const mockService: any = {};

  const Wrapper: React.FC = ({ children }) => (
    <LivenessFlowProvider flowProps={mockFlowProps} service={mockService}>
      {children}
    </LivenessFlowProvider>
  );

  const renderResults = render(ui, { wrapper: Wrapper });

  return {
    ...renderResults,
    mockFlowProps,
    mockService,
  };
}

export function getMockedFunction<T extends (...args: any[]) => any>(fn: T) {
  return fn as jest.MockedFunction<T>;
}
