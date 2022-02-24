import { renderHook } from '@testing-library/react-hooks';
import { useDeprecationWarning } from '../useDeprecationWarning';

const originalWarn = console.warn;

describe('useDeprecationWarning', () => {
  beforeAll(() => {
    console.warn = jest.fn();
  });
  afterAll(() => {
    console.warn = originalWarn;
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render message (shouldWarn true)', async () => {
    const message = 'This component is deprecated, use X instead';

    renderHook(() => useDeprecationWarning({ message }));
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(message);
  });

  it('should not render message if shouldWarn is false', async () => {
    const message = 'This component is deprecated, use X instead';

    renderHook(() => useDeprecationWarning({ message, shouldWarn: false }));
    expect(console.warn).toHaveBeenCalledTimes(0);
    expect(console.warn).not.toHaveBeenCalledWith(message);
  });

  it('should not throw reference error if process is not defined', async () => {
    const message = 'This component is deprecated, use X instead';

    const originalProcess = global.process;
    delete global.process;

    renderHook(() => useDeprecationWarning({ message }));
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(message);

    global.process = originalProcess;
  });
});
