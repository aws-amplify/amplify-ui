import * as React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithLivenessProvider, getMockedFunction } from '../../__mocks__';
import { useLivenessActor } from '../../hooks/useLivenessActor';
import { getVideoConstraints } from '../helpers';
import { StartLiveness } from '../StartLiveness';
import {
  INSTRUCTIONS,
  defaultLivenessInstructionsHeader,
  defaultPhotosensitiveWarningHeader,
  defaultLivenessHeaderHeading,
} from '../../hooks/useCustomComponents/defaultComponents';

jest.mock('../../hooks/useLivenessActor');
jest.mock('../../shared/CancelButton');
jest.mock('../helpers');

const mockUseLivenessActor = getMockedFunction(useLivenessActor);
const mockGetVideoConstraints = getMockedFunction(getVideoConstraints);

describe('StartLiveness', () => {
  const mockActorState: any = {};
  const mockActorSend = jest.fn();
  const mockBeginCheck = () => {
    mockActorSend({
      type: 'BEGIN',
      data: {
        videoConstraints: {},
      },
    });
  };

  const beginCheckBtnName = 'Begin check';

  beforeEach(() => {
    mockUseLivenessActor.mockReturnValue([mockActorState, mockActorSend]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the StartLiveness component and content appropriately', () => {
    renderWithLivenessProvider(
      <StartLiveness beginLivenessCheck={mockBeginCheck} />
    );

    expect(screen.getByText(/Photosensitivity warning/)).toBeInTheDocument();

    INSTRUCTIONS.forEach(({ desc }, index) => {
      // currently the first index of INSTRUCTIONS is HTML
      if (index > 0) {
        expect(screen.getByText(desc as string)).toBeInTheDocument();
      }
    });

    expect(
      screen.getByRole('button', { name: beginCheckBtnName })
    ).toBeInTheDocument();
  });

  it('should render the StartLiveness component with custom component override', () => {
    const photosensitiveWarning = 'Some warning related to photosensitivity';
    const livenessInstructions =
      'Some instructions to follow to use liveness face detector';
    renderWithLivenessProvider(
      <StartLiveness
        beginLivenessCheck={mockBeginCheck}
        components={{
          PhotosensitiveWarning: (): JSX.Element => {
            return <span>{photosensitiveWarning}</span>;
          },
          LivenessInstructions: (): JSX.Element => {
            return <span>{livenessInstructions}</span>;
          },
        }}
      />
    );

    expect(screen.getByText(photosensitiveWarning)).toBeInTheDocument();
    expect(screen.getByText(livenessInstructions)).toBeInTheDocument();
    // check for default liveness header component if no custom override
    expect(screen.getByText(defaultLivenessHeaderHeading)).toBeInTheDocument();

    // check that the default components are not present when custom overrides are provided
    expect(
      screen.queryByText(defaultPhotosensitiveWarningHeader)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(defaultLivenessInstructionsHeader)
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: beginCheckBtnName })
    ).toBeInTheDocument();
  });

  it('should call the begin handler on begin check', () => {
    const mockVideoConstraints = {};
    mockGetVideoConstraints.mockReturnValue(mockVideoConstraints);

    renderWithLivenessProvider(
      <StartLiveness beginLivenessCheck={mockBeginCheck} />
    );

    userEvent.click(screen.getByRole('button', { name: beginCheckBtnName }));

    expect(mockActorSend).toHaveBeenCalledWith({
      type: 'BEGIN',
      data: {
        videoConstraints: mockVideoConstraints,
      },
    });
  });
});
