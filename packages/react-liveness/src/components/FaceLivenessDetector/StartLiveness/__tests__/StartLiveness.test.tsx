import * as React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  renderWithLivenessProvider,
  getMockedFunction,
} from '../../__mocks__/utils';
import { useLivenessActor } from '../../hooks/useLivenessActor';
import { StartLiveness } from '../StartLiveness';
import { getDisplayText } from '../../utils/getDisplayText';

jest.mock('../../hooks/useLivenessActor');
jest.mock('../../shared/CancelButton');
jest.mock('../helpers');

const mockUseLivenessActor = getMockedFunction(useLivenessActor);

describe('StartLiveness', () => {
  const mockActorState: any = {};
  const mockActorSend = jest.fn();
  const mockBeginCheck = () => {
    mockActorSend({
      type: 'BEGIN',
    });
  };

  const { instructionDisplayText } = getDisplayText(undefined);

  const { instructionsBeginCheckText } = instructionDisplayText;

  beforeEach(() => {
    mockUseLivenessActor.mockReturnValue([mockActorState, mockActorSend]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the StartLiveness component and content appropriately', () => {
    renderWithLivenessProvider(
      <StartLiveness
        instructionDisplayText={instructionDisplayText}
        beginLivenessCheck={mockBeginCheck}
      />
    );
    expect(
      screen.getByText(instructionDisplayText.photosensitivyWarningHeadingText)
    ).toBeInTheDocument();
    expect(
      screen.getByText(instructionDisplayText.photosensitivyWarningBodyText)
    ).toBeInTheDocument();
    expect(
      screen.getByText(instructionDisplayText.instructionListHeadingText)
    ).toBeInTheDocument();
    expect(
      screen.getByText(instructionDisplayText.instructionListStepOneText)
    ).toBeInTheDocument();
    expect(
      screen.getByText(instructionDisplayText.instructionListStepTwoText)
    ).toBeInTheDocument();
    expect(
      screen.getByText(instructionDisplayText.instructionListStepThreeText)
    ).toBeInTheDocument();
    expect(
      screen.getByText(instructionDisplayText.instructionListStepFourText)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: instructionsBeginCheckText,
      })
    ).toBeInTheDocument();
  });

  it('should render the StartLiveness component with custom component override', () => {
    const photosensitiveWarning = 'Some warning related to photosensitivity';
    const livenessInstructions =
      'Some instructions to follow to use liveness face detector';
    renderWithLivenessProvider(
      <StartLiveness
        beginLivenessCheck={mockBeginCheck}
        instructionDisplayText={instructionDisplayText}
        components={{
          PhotosensitiveWarning: (): JSX.Element => {
            return <span>{photosensitiveWarning}</span>;
          },
          Instructions: (): JSX.Element => {
            return <span>{livenessInstructions}</span>;
          },
        }}
      />
    );

    expect(screen.getByText(photosensitiveWarning)).toBeInTheDocument();
    expect(screen.getByText(livenessInstructions)).toBeInTheDocument();
    // check for default liveness header component if no custom override
    expect(
      screen.getByText(instructionDisplayText.instructionsHeaderHeadingText)
    ).toBeInTheDocument();

    // check that the default components are not present when custom overrides are provided
    expect(
      screen.queryByText(
        instructionDisplayText.photosensitivyWarningHeadingText
      )
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(instructionDisplayText.instructionListHeadingText)
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: instructionsBeginCheckText })
    ).toBeInTheDocument();
  });

  it('should call the begin handler on begin check', () => {
    renderWithLivenessProvider(
      <StartLiveness
        beginLivenessCheck={mockBeginCheck}
        instructionDisplayText={instructionDisplayText}
      />
    );

    userEvent.click(
      screen.getByRole('button', { name: instructionsBeginCheckText })
    );

    expect(mockActorSend).toHaveBeenCalledWith({
      type: 'BEGIN',
    });
  });
});
