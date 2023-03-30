import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { LivenessErrorState } from '../../service';
import { FaceLivenessErrorModal } from '../FaceLivenessErrorModal';
import { defaultErrorDisplayText } from '../../displayText';
import { mockMatchMedia } from '../../__mocks__';

const {
  serverHeaderText,
  serverMessageText,
  timeoutHeaderText,
  timeoutMessageText,
  clientHeaderText,
  clientMessageText,
  tryAgainText,
  landscapeHeaderText,
  landscapeMessageText,
} = defaultErrorDisplayText;

describe('FaceLivenessErrorModal', () => {
  it('should render the component content appropriately', () => {
    const error = new Error();
    error.name = LivenessErrorState.SERVER_ERROR;
    render(<FaceLivenessErrorModal error={error} onRetry={() => {}} />);

    expect(screen.getByText(serverHeaderText)).toBeInTheDocument();
    expect(screen.getByText(serverMessageText)).toBeInTheDocument();
  });

  it('should render the timeout message appropriately', () => {
    const error = new Error();
    error.name = LivenessErrorState.TIMEOUT;
    render(<FaceLivenessErrorModal error={error} onRetry={() => {}} />);

    expect(screen.getByText(timeoutHeaderText)).toBeInTheDocument();
    expect(screen.getByText(timeoutMessageText)).toBeInTheDocument();
  });

  it('should render the runtime error message appropriately', () => {
    const error = new Error();
    error.name = LivenessErrorState.RUNTIME_ERROR;
    render(<FaceLivenessErrorModal error={error} onRetry={() => {}} />);

    expect(screen.getByText(clientHeaderText)).toBeInTheDocument();
    expect(screen.getByText(clientMessageText)).toBeInTheDocument();
  });

  it('should render the null error type message appropriately', () => {
    const error = new Error();
    render(<FaceLivenessErrorModal error={error} onRetry={() => {}} />);

    expect(screen.getByText(tryAgainText)).toBeInTheDocument();
  });

  it('should render the orientation error component appropriately', () => {
    mockMatchMedia('(orientation: landscape)', true);

    const error = new Error();
    error.name = LivenessErrorState.MOBILE_LANDSCAPE_ERROR;
    render(<FaceLivenessErrorModal error={error} onRetry={() => {}} />);

    expect(screen.getByText(landscapeHeaderText)).toBeInTheDocument();
    expect(screen.getByText(landscapeMessageText)).toBeInTheDocument();
  });
});
