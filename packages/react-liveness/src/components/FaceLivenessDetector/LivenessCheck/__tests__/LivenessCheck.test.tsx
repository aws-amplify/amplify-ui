import * as React from 'react';
import { screen } from '@testing-library/react';
import { useThemeBreakpoint } from '@aws-amplify/ui-react/internal';

import { LivenessErrorState } from '../../service';
import {
  renderWithLivenessProvider,
  getMockedFunction,
} from '../../__mocks__/utils';
import { LivenessCheck } from '../LivenessCheck';
import { useLivenessSelector, useLivenessActor } from '../../hooks';
import { getDisplayText } from '../../utils/getDisplayText';
import { defaultErrorDisplayText } from '../../displayText';
import { mockMatchMedia } from '../../__mocks__/utils';
import { CancelButton } from '../../shared/CancelButton';

jest.mock('../../hooks');
jest.mock('@aws-amplify/ui-react/internal');
jest.mock('../../shared/CancelButton');
jest.mock('../LivenessCameraModule');

const mockUseLivenessActor = getMockedFunction(useLivenessActor);
const mockUseThemeBreakpoint = getMockedFunction(useThemeBreakpoint);
const mockUseLivenessSelector = getMockedFunction(useLivenessSelector);

const { landscapeHeaderText, landscapeMessageText } = defaultErrorDisplayText;

const {
  hintDisplayText,
  cameraDisplayText,
  streamDisplayText,
  errorDisplayText,
  instructionDisplayText,
} = getDisplayText(undefined);

const {
  cameraMinSpecificationsHeadingText,
  cameraMinSpecificationsMessageText,
  cameraNotFoundHeadingText,
  cameraNotFoundMessageText,
  retryCameraPermissionsText,
} = cameraDisplayText;

const { cancelLivenessCheckText } = streamDisplayText;

describe('LivenessCheck', () => {
  const mockActorState: any = {
    matches: jest.fn(),
  };
  const mockActorSend = jest.fn();

  const { userAgent: originalUserAgent } = window.navigator;

  beforeAll(() => {
    Object.defineProperty(
      window.navigator,
      'userAgent',
      ((value) => ({
        get() {
          return value;
        },
        set(v) {
          value = v;
        },
      }))(window.navigator['userAgent'])
    );
  });

  afterAll(() => {
    Object.defineProperty(window, 'navigator', {
      configurable: true,
      value: originalUserAgent,
    });
  });

  beforeEach(() => {
    mockUseLivenessActor.mockReturnValue([mockActorState, mockActorSend]);
    mockUseThemeBreakpoint.mockReturnValue('small');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component content on desktop with permissionDenied true', () => {
    mockActorState.matches.mockReturnValue(true);

    renderWithLivenessProvider(
      <LivenessCheck
        hintDisplayText={hintDisplayText}
        cameraDisplayText={cameraDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
        instructionDisplayText={instructionDisplayText}
      />
    );

    expect(
      screen.getByRole('button', {
        name: cancelLivenessCheckText,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(cameraNotFoundHeadingText)).toBeInTheDocument();
    expect(screen.getByText(cameraNotFoundMessageText)).toBeInTheDocument();
    expect(screen.getByText(retryCameraPermissionsText)).toBeInTheDocument();
    expect(screen.queryByText('LivenessCameraModule')).not.toBeInTheDocument();
  });

  it('should not render the cancel button on the permission denied screen when components.CancelButton is null', () => {
    mockActorState.matches.mockReturnValue(true);

    renderWithLivenessProvider(
      <LivenessCheck
        hintDisplayText={hintDisplayText}
        cameraDisplayText={cameraDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
        instructionDisplayText={instructionDisplayText}
        components={{ CancelButton: null }}
      />
    );

    expect(
      screen.queryByRole('button', { name: cancelLivenessCheckText })
    ).not.toBeInTheDocument();
    expect(screen.getByText(retryCameraPermissionsText)).toBeInTheDocument();
  });

  it('should pass a custom CancelButton component on the permission denied screen', () => {
    mockActorState.matches.mockReturnValue(true);
    const CustomCancelButton = () => <button>Leave check</button>;

    renderWithLivenessProvider(
      <LivenessCheck
        hintDisplayText={hintDisplayText}
        cameraDisplayText={cameraDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
        instructionDisplayText={instructionDisplayText}
        components={{ CancelButton: CustomCancelButton }}
      />
    );

    expect(CancelButton).toHaveBeenCalledWith(
      { ariaLabel: cancelLivenessCheckText, Component: CustomCancelButton },
      expect.anything()
    );
  });

  it('should render the component content on desktop when no 15 fps camera is found', () => {
    mockActorState.matches.mockReturnValue(true);
    mockUseLivenessSelector.mockReturnValue(
      LivenessErrorState.CAMERA_FRAMERATE_ERROR
    );

    renderWithLivenessProvider(
      <LivenessCheck
        hintDisplayText={hintDisplayText}
        cameraDisplayText={cameraDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
        instructionDisplayText={instructionDisplayText}
      />
    );

    expect(
      screen.getByRole('button', {
        name: cancelLivenessCheckText,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(cameraMinSpecificationsHeadingText)
    ).toBeInTheDocument();
    expect(
      screen.getByText(cameraMinSpecificationsMessageText)
    ).toBeInTheDocument();
    expect(screen.queryByText('LivenessCameraModule')).not.toBeInTheDocument();
  });

  it('should render the component content on mobile with permissionDenied false', () => {
    mockActorState.matches.mockReturnValue(false);
    mockUseThemeBreakpoint.mockReturnValue('base');

    renderWithLivenessProvider(
      <LivenessCheck
        hintDisplayText={hintDisplayText}
        cameraDisplayText={cameraDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
        instructionDisplayText={instructionDisplayText}
      />
    );

    expect(
      screen.queryByText(cameraNotFoundHeadingText)
    ).not.toBeInTheDocument();
    expect(screen.getByText('LivenessCameraModule')).toBeInTheDocument();
  });

  // Portrait is the only orientation that worked before the landscape gate was
  // removed, so its markup must be untouched by that removal. This snapshot
  // was captured from the pre-removal component.
  it('should render portrait unchanged by the landscape gate removal', () => {
    mockActorState.matches.mockReturnValue(false);
    (global.navigator as any).userAgent =
      'Mozilla/5.0 (Linux; Android 12; Pixel 6 Build/SD1A.210817.023; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Firefox/94.0.4606.71 Mobile Safari/537.36';
    mockMatchMedia('(orientation: landscape)', false);

    const { container } = renderWithLivenessProvider(
      <LivenessCheck
        hintDisplayText={hintDisplayText}
        cameraDisplayText={cameraDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
        instructionDisplayText={instructionDisplayText}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render the camera in mobile landscape rather than an error', () => {
    mockActorState.matches.mockReturnValue(false);
    (global.navigator as any).userAgent =
      'Mozilla/5.0 (Linux; Android 12; Pixel 6 Build/SD1A.210817.023; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Firefox/94.0.4606.71 Mobile Safari/537.36';
    mockMatchMedia('(orientation: landscape)', true);

    renderWithLivenessProvider(
      <LivenessCheck
        hintDisplayText={hintDisplayText}
        cameraDisplayText={cameraDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
        instructionDisplayText={instructionDisplayText}
      />
    );

    expect(screen.getByText('LivenessCameraModule')).toBeInTheDocument();
    expect(screen.queryByText(landscapeHeaderText)).not.toBeInTheDocument();
    expect(screen.queryByText(landscapeMessageText)).not.toBeInTheDocument();
  });

  it('should report the orientation instead of warning about it', () => {
    mockActorState.matches.mockReturnValue(false);
    (global.navigator as any).userAgent =
      'Mozilla/5.0 (Linux; Android 12; Pixel 6 Build/SD1A.210817.023; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Firefox/94.0.4606.71 Mobile Safari/537.36';
    mockMatchMedia('(orientation: landscape)', true);

    renderWithLivenessProvider(
      <LivenessCheck
        hintDisplayText={hintDisplayText}
        cameraDisplayText={cameraDisplayText}
        streamDisplayText={streamDisplayText}
        errorDisplayText={errorDisplayText}
        instructionDisplayText={instructionDisplayText}
      />
    );

    expect(mockActorSend).toHaveBeenCalledWith({
      type: 'ORIENTATION_CHANGED',
      data: { orientation: 'landscape' },
    });
    expect(mockActorSend).not.toHaveBeenCalledWith({
      type: 'MOBILE_LANDSCAPE_WARNING',
    });
  });
});
