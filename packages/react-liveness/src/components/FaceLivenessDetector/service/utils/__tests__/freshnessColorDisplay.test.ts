/* eslint-disable  */
import 'jest-canvas-mock';

import { FreshnessColorDisplay } from '../freshnessColorDisplay';
import {
  mockContext,
  mockSessionInformation,
  mockSessionInformationNoFlatColors,
  MOCK_COLOR_SEQUENCES,
} from '../__mocks__/testUtils';
import { getColorsSequencesFromSessionInformation } from '../liveness';

const mockMediaRecorder = {
  start: jest.fn(),
  ondataavailable: jest.fn(),
  onerror: jest.fn(),
  state: '',
  stop: jest.fn(),
  addEventListener: jest.fn(),
};

describe('FreshnessColorDisplay', () => {
  const stream = {} as MediaStream;

  beforeEach(() => {
    Object.defineProperty(window, 'MediaRecorder', {
      writable: true,
      value: jest.fn().mockImplementation(() => mockMediaRecorder),
    });
  });

  afterEach(() => {
    mockMediaRecorder.state = '';
    jest.clearAllMocks();
  });

  it('can be initialized', () => {
    expect(new FreshnessColorDisplay(mockContext(), [])).toBeTruthy();
  });

  it('can display freshness colors, sends a clientInfo event for the first flat color displayed', async () => {
    const context = mockContext();
    const display = new FreshnessColorDisplay(
      context,
      getColorsSequencesFromSessionInformation(mockSessionInformation)
    );

    const response = await display.displayColorTick();
    expect(response).toBe(false);

    const canvasContext =
      context.freshnessColorAssociatedParams.freshnessColorEl.getContext('2d');
    const drawCalls = (canvasContext as any).__getDrawCalls();
    const path = (canvasContext as any)._path;
    expect(drawCalls[drawCalls.length - 1].type).toBe('fillRect');
    expect(path[0].type).toBe('beginPath');
    expect(path[1].type).toBe('ellipse');
    expect(path[2].type).toBe('clip');

    const clientSessionInfo = (
      context.livenessStreamProvider.sendClientInfo as jest.Mock
    ).mock.calls[0][0];
    expect(context.livenessStreamProvider.sendClientInfo).toHaveBeenCalledTimes(
      1
    );
    expect(
      clientSessionInfo.Challenge.FaceMovementAndLightChallenge.ColorDisplayed
        .CurrentColor.RGB
    ).toStrictEqual([0, 0, 0]);
    expect(
      clientSessionInfo.Challenge.FaceMovementAndLightChallenge.ColorDisplayed
        .PreviousColor.RGB
    ).toStrictEqual([0, 0, 0]);
  });

  it('can change from flat display to scrolling display, sends client info event for a new color', async () => {
    const context = mockContext();
    const display = new FreshnessColorDisplay(
      context,
      getColorsSequencesFromSessionInformation(mockSessionInformation)
    );

    (display as any).init();
    (display as any).timeLastFlatOrScrollChange = Date.now() - 110; // mock displaying the first flat color for 100ms
    (display as any).isFirstTick = false;
    const response = await display.displayColorTick();
    expect(response).toBe(false);

    const clientSessionInfo = (
      context.livenessStreamProvider.sendClientInfo as jest.Mock
    ).mock.calls[0][0];
    expect(context.livenessStreamProvider.sendClientInfo).toHaveBeenCalledTimes(
      1
    );
    expect(
      clientSessionInfo.Challenge.FaceMovementAndLightChallenge.ColorDisplayed
        .CurrentColor.RGB
    ).toStrictEqual([255, 255, 255]);
    expect(
      clientSessionInfo.Challenge.FaceMovementAndLightChallenge.ColorDisplayed
        .PreviousColor.RGB
    ).toStrictEqual([0, 0, 0]);
  });

  it('can change from scrolling display to flat display, sends client info event with same colors for current and prev', async () => {
    const context = mockContext();
    const display = new FreshnessColorDisplay(
      context,
      getColorsSequencesFromSessionInformation(mockSessionInformation)
    );

    (display as any).init();
    (display as any).timeLastFlatOrScrollChange = Date.now() - 310; // mock scrolling the second color for 300ms
    (display as any).stage = 'SCROLLING'; // mock set to scrolling
    (display as any).stageIndex = 0; // mock set to the second color
    (display as any).isFirstTick = false;
    const response = await display.displayColorTick();
    expect(response).toBe(false);
    expect((display as any).stageIndex).toStrictEqual(1);

    const clientSessionInfo = (
      context.livenessStreamProvider.sendClientInfo as jest.Mock
    ).mock.calls[0][0];
    expect(context.livenessStreamProvider.sendClientInfo).toHaveBeenCalledTimes(
      1
    );
    expect(
      clientSessionInfo.Challenge.FaceMovementAndLightChallenge.ColorDisplayed
        .CurrentColor.RGB
    ).toStrictEqual([0, 0, 0]);
    expect(
      clientSessionInfo.Challenge.FaceMovementAndLightChallenge.ColorDisplayed
        .PreviousColor.RGB
    ).toStrictEqual([0, 0, 0]);
  });

  it('can display freshness colors, returns true when all stages are complete', async () => {
    const context = mockContext();
    const display = new FreshnessColorDisplay(
      context,
      getColorsSequencesFromSessionInformation(mockSessionInformation)
    );

    (display as any).init();
    (display as any).stageIndex = (MOCK_COLOR_SEQUENCES.length - 1) * 2; // mock going through all stages
    (display as any).currColorIndex = 9; // mock going through all stages
    (display as any).isFirstTick = false;
    const response = await display.displayColorTick();
    expect(response).toBe(true);

    const canvasContext =
      context.freshnessColorAssociatedParams.freshnessColorEl.getContext('2d');
    const drawCalls = (canvasContext as any).__getDrawCalls();
    expect(drawCalls.length).toBe(0);
  });

  it('can skip a flat stage if the flat display duration is 0', async () => {
    const context = mockContext();
    const display = new FreshnessColorDisplay(
      context,
      getColorsSequencesFromSessionInformation(
        mockSessionInformationNoFlatColors
      )
    );

    (display as any).init();
    (display as any).stageIndex = 1; // mock set to the second color
    (display as any).currColorIndex = 1; // mock skipping the first flat color
    (display as any).timeLastFlatOrScrollChange = Date.now() - 310; // mock scrolling the second color for 300ms
    (display as any).stage = 'SCROLLING'; // mock set to scrolling
    (display as any).isFirstTick = false;
    await display.displayColorTick();
    expect((display as any).currColorIndex).toBe(2); // if we skip the flat stage of the color then the current color index will be incremented
    expect((display as any).stage).toBe('SCROLLING');
  });
});
