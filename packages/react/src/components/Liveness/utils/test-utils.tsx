import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { LivenessInterpreter } from '@aws-amplify/ui';

import { LivenessFlowProvider } from '../providers';
import { LivenessFlowProps } from '../LivenessFlow';

type RenderWithLivenessLivenessProviderResult = RenderResult & {
  mockFlowProps: LivenessFlowProps;
  mockService: LivenessInterpreter;
};

export function renderWithLivenessProvider(
  ui: JSX.Element
): RenderWithLivenessLivenessProviderResult {
  const mockFlowProps: LivenessFlowProps = {
    sessionId: 'sessionId',
    onGetLivenessDetection: jest.fn(),
  };
  const mockService: LivenessInterpreter = {} as LivenessInterpreter;

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

export function getMockedFunction<T extends (...args: any[]) => any>(
  fn: T
): jest.MockedFunction<T> {
  return fn as jest.MockedFunction<T>;
}
