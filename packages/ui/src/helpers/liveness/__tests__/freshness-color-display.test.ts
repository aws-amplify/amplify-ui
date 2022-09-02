import { FreshnessColorDisplay } from '../freshness-color-display';
import { mockContext, mockSessionInformation } from '../liveness-test-helpers';
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

  it('can display freshness colors, single tick should return false since it has not displayed all colors', async () => {
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
  });

  it('can display freshness colors, returns true when all stages are complete', async () => {
    const context = mockContext();
    const display = new FreshnessColorDisplay(
      context,
      getColorsSequencesFromSessionInformation(mockSessionInformation)
    );

    (display as any).colorStageIndex = 25; // mock going through all stages
    const response = await display.displayColorTick();
    expect(response).toBe(true);

    const canvasContext =
      context.freshnessColorAssociatedParams.freshnessColorEl.getContext('2d');
    const drawCalls = (canvasContext as any).__getDrawCalls();
    expect(drawCalls.length).toBe(0);
  });
});
