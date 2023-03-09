import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { LivenessInterpreter } from '@aws-amplify/ui';

import { FaceLivenessDetectorProvider } from '../providers';
import { FaceLivenessDetectorProps } from '../FaceLivenessDetector';

type RenderWithLivenessLivenessProviderResult = RenderResult & {
  mockComponentProps: FaceLivenessDetectorProps;
  mockService: LivenessInterpreter;
};

export function renderWithLivenessProvider(
  ui: JSX.Element
): RenderWithLivenessLivenessProviderResult {
  const mockComponentProps: FaceLivenessDetectorProps = {
    sessionId: 'sessionId',
    onAnalysisComplete: jest.fn(),
  };
  const mockService: LivenessInterpreter = {} as LivenessInterpreter;

  const Wrapper: React.FC = ({ children }) => (
    <FaceLivenessDetectorProvider
      componentProps={mockComponentProps}
      service={mockService}
    >
      {children}
    </FaceLivenessDetectorProvider>
  );

  const renderResults = render(ui, { wrapper: Wrapper });

  return {
    ...renderResults,
    mockComponentProps,
    mockService,
  };
}

export function getMockedFunction<T extends (...args: any[]) => any>(
  fn: T
): jest.MockedFunction<T> {
  return fn as jest.MockedFunction<T>;
}

export function mockMatchMedia(
  mediaQuery: string = '',
  matches: boolean = false
): void {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string = mediaQuery) => ({
      matches: matches,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}
