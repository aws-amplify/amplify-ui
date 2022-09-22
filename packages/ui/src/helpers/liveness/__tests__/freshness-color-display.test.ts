import { FreshnessColorDisplay } from '../freshness-color-display';
import {
  mockContext,
  mockSessionInformation,
  MOCK_COLOR_SEQUENCES,
} from '../liveness-test-helpers';
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

    (display as any).timeLastFlatOrScrollChange = Date.now() - 110; // mock displaying the first flat color for 100ms
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

  it('can change from scrolling display to flat display, sends client info event with same colors for next and prev', async () => {
    const context = mockContext();
    const display = new FreshnessColorDisplay(
      context,
      getColorsSequencesFromSessionInformation(mockSessionInformation)
    );

    (display as any).timeLastFlatOrScrollChange = Date.now() - 310; // mock scrolling the second color for 300ms
    (display as any).isScrolling = true; // mock set to scrolling
    (display as any).colorStageIndex = 1; // mock set to the second color
    const response = await display.displayColorTick();
    expect(response).toBe(false);
    expect((display as any).colorStageIndex).toStrictEqual(2);

    const clientSessionInfo = (
      context.livenessStreamProvider.sendClientInfo as jest.Mock
    ).mock.calls[0][0];
    expect(context.livenessStreamProvider.sendClientInfo).toHaveBeenCalledTimes(
      1
    );
    expect(
      clientSessionInfo.Challenge.FaceMovementAndLightChallenge.ColorDisplayed
        .CurrentColor.RGB
    ).toStrictEqual([255, 0, 0]);
    expect(
      clientSessionInfo.Challenge.FaceMovementAndLightChallenge.ColorDisplayed
        .PreviousColor.RGB
    ).toStrictEqual([255, 0, 0]);
  });

  it('can display freshness colors, returns true when all stages are complete', async () => {
    const context = mockContext();
    const display = new FreshnessColorDisplay(
      context,
      getColorsSequencesFromSessionInformation(mockSessionInformation)
    );

    (display as any).colorStageIndex = MOCK_COLOR_SEQUENCES.length - 1; // mock going through all stages
    const response = await display.displayColorTick();
    expect(response).toBe(true);

    const canvasContext =
      context.freshnessColorAssociatedParams.freshnessColorEl.getContext('2d');
    const drawCalls = (canvasContext as any).__getDrawCalls();
    expect(drawCalls.length).toBe(0);
  });
});
