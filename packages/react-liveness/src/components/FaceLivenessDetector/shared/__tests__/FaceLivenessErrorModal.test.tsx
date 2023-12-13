import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { LivenessErrorState, ErrorState } from '../../service';
import {
  FaceLivenessErrorModal,
  renderErrorModal,
} from '../FaceLivenessErrorModal';
import { defaultErrorDisplayText } from '../../displayText';

const {
  serverHeaderText,
  serverMessageText,
  timeoutHeaderText,
  timeoutMessageText,
  clientHeaderText,
  clientMessageText,
  tryAgainText,
} = defaultErrorDisplayText;

describe('FaceLivenessErrorModal', () => {
  it('should render the component content appropriately', () => {
    const errorState = LivenessErrorState.SERVER_ERROR;
    render(
      <FaceLivenessErrorModal onRetry={() => {}}>
        {renderErrorModal({ errorState })}
      </FaceLivenessErrorModal>
    );

    expect(screen.getByText(serverHeaderText)).toBeInTheDocument();
    expect(screen.getByText(serverMessageText)).toBeInTheDocument();
  });

  it('should render the timeout message appropriately', () => {
    const errorState = LivenessErrorState.TIMEOUT;
    render(
      <FaceLivenessErrorModal onRetry={() => {}}>
        {renderErrorModal({ errorState })}
      </FaceLivenessErrorModal>
    );

    expect(screen.getByText(timeoutHeaderText)).toBeInTheDocument();
    expect(screen.getByText(timeoutMessageText)).toBeInTheDocument();
  });

  it('should render the timeout message with proper accessibility attributes', () => {
    const errorState = LivenessErrorState.TIMEOUT;
    render(
      <FaceLivenessErrorModal onRetry={() => {}}>
        {renderErrorModal({ errorState })}
      </FaceLivenessErrorModal>
    );

    const timeoutModal = screen.getByRole('alertdialog');
    expect(timeoutModal).toBeInTheDocument();
    expect(timeoutModal).toHaveAttribute(
      'aria-describedby',
      'amplify-liveness-error-message'
    );
    expect(timeoutModal).toHaveAttribute(
      'aria-labelledby',
      'amplify-liveness-error-heading'
    );
  });

  it('should render the runtime error message appropriately', () => {
    const errorState = LivenessErrorState.RUNTIME_ERROR;
    render(
      <FaceLivenessErrorModal onRetry={() => {}}>
        {renderErrorModal({ errorState })}
      </FaceLivenessErrorModal>
    );

    expect(screen.getByText(clientHeaderText)).toBeInTheDocument();
    expect(screen.getByText(clientMessageText)).toBeInTheDocument();
  });

  it('should render the null error type message appropriately', () => {
    const errorState = undefined;
    render(
      <FaceLivenessErrorModal onRetry={() => {}}>
        {renderErrorModal({
          errorState: errorState as unknown as ErrorState,
        })}
      </FaceLivenessErrorModal>
    );

    expect(screen.getByText(tryAgainText)).toBeInTheDocument();
  });
});
