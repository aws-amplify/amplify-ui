import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { LivenessInterpreter } from '@aws-amplify/ui';

import { FaceLivenessDetectorProvider } from '../providers';
import { FaceLivenessDetectorProps } from '../FaceLivenessDetector';

type RenderWithLivenessLivenessProviderResult = RenderResult & {
  mockFlowProps: FaceLivenessDetectorProps;
  mockService: LivenessInterpreter;
};

export function renderWithLivenessProvider(
  ui: JSX.Element
): RenderWithLivenessLivenessProviderResult {
  const mockFlowProps: FaceLivenessDetectorProps = {
    sessionId: 'sessionId',
    onGetLivenessDetection: jest.fn(),
  };
  const mockService: LivenessInterpreter = {} as LivenessInterpreter;

  const Wrapper: React.FC = ({ children }) => (
    <FaceLivenessDetectorProvider
      flowProps={mockFlowProps}
      service={mockService}
    >
      {children}
    </FaceLivenessDetectorProvider>
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
