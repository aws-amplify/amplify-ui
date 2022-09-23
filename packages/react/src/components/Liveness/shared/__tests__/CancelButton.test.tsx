import * as React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  renderWithLivenessProvider,
  getMockedFunction,
} from '../../utils/test-utils';
import { useLivenessActor } from '../../hooks/useLivenessActor';
import { CancelButton } from '../CancelButton';

jest.mock('../../hooks/useLivenessActor');

const mockUseLivenessActor = getMockedFunction(useLivenessActor);

describe('CancelButton', () => {
  const mockActorState: any = {};
  const mockActorSend = jest.fn();

  const cancelBtnName = 'Cancel Liveness check';

  beforeEach(() => {
    mockUseLivenessActor.mockReturnValue([mockActorState, mockActorSend]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component content appropriately', () => {
    renderWithLivenessProvider(<CancelButton sourceScreen="screen" />);

    expect(
      screen.getByRole('button', { name: cancelBtnName })
    ).toBeInTheDocument();
  });

  it('should render the component content appropriately on mobile', () => {
    renderWithLivenessProvider(<CancelButton sourceScreen="screen" />);

    expect(screen.getByTestId('close-icon')).toBeInTheDocument();
  });

  it('should call the send method on cancel', () => {
    renderWithLivenessProvider(<CancelButton sourceScreen="screen" />);

    userEvent.click(screen.getByRole('button', { name: cancelBtnName }));

    expect(mockActorSend).toHaveBeenCalledWith({
      type: 'CANCEL',
    });
  });
});
