import * as React from 'react';
import { screen } from '@testing-library/react';

import {
  renderWithLivenessProvider,
  getMockedFunction,
} from '../../__mocks__/utils';
import { useLivenessActor } from '../../hooks/useLivenessActor';
import { CancelButton } from '../CancelButton';

jest.mock('../../hooks/useLivenessActor');

const mockUseLivenessActor = getMockedFunction(useLivenessActor);

describe('CancelButton', () => {
  const mockActorState: any = jest.fn();
  const mockActorSend = jest.fn();

  const buttonAriaLabel = 'Cancel Liveness check';

  beforeEach(() => {
    mockUseLivenessActor.mockReturnValue([mockActorState, mockActorSend]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component content appropriately', () => {
    renderWithLivenessProvider(<CancelButton ariaLabel={buttonAriaLabel} />);

    expect(
      screen.getByRole('button', { name: buttonAriaLabel })
    ).toBeInTheDocument();
  });

  it('should render the component content appropriately on mobile', () => {
    renderWithLivenessProvider(<CancelButton ariaLabel={buttonAriaLabel} />);

    expect(screen.getByTestId('close-icon')).toBeInTheDocument();
  });

  it('should call the send method on cancel', () => {
    renderWithLivenessProvider(<CancelButton ariaLabel={buttonAriaLabel} />);

    expect(
      screen.getByRole('button', { name: buttonAriaLabel })
    ).toBeInTheDocument();
    screen.getByRole('button', { name: buttonAriaLabel }).click();

    expect(mockActorSend).toHaveBeenCalledWith({
      type: 'CANCEL',
    });
  });

  it('should render nothing if the machine state is done', () => {
    mockUseLivenessActor.mockReturnValueOnce([
      { done: true } as any,
      mockActorSend,
    ]);
    renderWithLivenessProvider(<CancelButton ariaLabel={buttonAriaLabel} />);

    expect(
      screen.queryByRole('button', { name: buttonAriaLabel })
    ).not.toBeInTheDocument();
  });

  it('should render a custom component that cancels the check', () => {
    const CustomCancelButton = ({ onCancel }: { onCancel: () => void }) => (
      <button onClick={onCancel}>Leave check</button>
    );
    renderWithLivenessProvider(
      <CancelButton
        ariaLabel={buttonAriaLabel}
        Component={CustomCancelButton}
      />
    );

    expect(
      screen.queryByRole('button', { name: buttonAriaLabel })
    ).not.toBeInTheDocument();
    screen.getByRole('button', { name: 'Leave check' }).click();

    expect(mockActorSend).toHaveBeenCalledWith({ type: 'CANCEL' });
  });

  it('should not render a custom component if the machine state is done', () => {
    mockUseLivenessActor.mockReturnValueOnce([
      { done: true } as any,
      mockActorSend,
    ]);
    const CustomCancelButton = () => <button>Leave check</button>;
    renderWithLivenessProvider(
      <CancelButton
        ariaLabel={buttonAriaLabel}
        Component={CustomCancelButton}
      />
    );

    expect(
      screen.queryByRole('button', { name: 'Leave check' })
    ).not.toBeInTheDocument();
  });
});
