import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { FaceLivenessErrorModal } from '../FaceLivenessErrorModal';
import {
  LivenessErrorState,
  LivenessErrorStateStringMap,
} from '@aws-amplify/ui';

describe('FaceLivenessErrorModal', () => {
  it('should render the component content appropriately', () => {
    const error = new Error();
    error.name = LivenessErrorState.SERVER_ERROR;
    render(<FaceLivenessErrorModal error={error} onRetry={() => {}} />);

    expect(
      screen.getByText(
        LivenessErrorStateStringMap[LivenessErrorState.SERVER_ERROR]
      )
    ).toBeInTheDocument();
  });

  it('should render the timeout message appropriately', () => {
    const error = new Error();
    error.name = LivenessErrorState.TIMEOUT;
    render(<FaceLivenessErrorModal error={error} onRetry={() => {}} />);

    expect(
      screen.getByText(LivenessErrorStateStringMap[LivenessErrorState.TIMEOUT])
    ).toBeInTheDocument();
  });

  it('should render the runtime error message appropriately', () => {
    const error = new Error();
    error.name = LivenessErrorState.RUNTIME_ERROR;
    render(<FaceLivenessErrorModal error={error} onRetry={() => {}} />);

    expect(
      screen.getByText(
        LivenessErrorStateStringMap[LivenessErrorState.RUNTIME_ERROR]
      )
    ).toBeInTheDocument();
  });

  it('should render the timeout message appropriately', () => {
    const error = new Error();
    error.name = LivenessErrorState.TIMEOUT;
    render(<FaceLivenessErrorModal error={error} onRetry={() => {}} />);

    expect(
      screen.getByText(LivenessErrorStateStringMap[LivenessErrorState.TIMEOUT])
    ).toBeInTheDocument();
  });

  it('should render the null error type message appropriately', () => {
    const error = new Error();
    render(<FaceLivenessErrorModal error={error} onRetry={() => {}} />);

    expect(screen.getByText('Try again')).toBeInTheDocument();
  });
});
