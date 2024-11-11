import { renderHook } from '@testing-library/react-hooks';
import { useAutoresizeTextArea } from '../useAutoresizeTextarea';

describe('useAutoresizeTextArea', () => {
  let textAreaRef: HTMLTextAreaElement;

  beforeEach(() => {
    textAreaRef = document.createElement('textarea');
    jest.spyOn(window, 'addEventListener');
    jest.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should set the height of the textarea', () => {
    renderHook(() => useAutoresizeTextArea(textAreaRef, 'initial value'));
    expect(textAreaRef.style.height).toBe('0px');
  });

  it('should add and remove event listener for window resize', () => {
    const { unmount } = renderHook(() => useAutoresizeTextArea(textAreaRef));
    expect(window.addEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    );

    unmount();
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    );
  });

  it('should not throw error when textAreaRef is null', () => {
    expect(() => {
      renderHook(() => useAutoresizeTextArea(null));
    }).not.toThrow();
  });
});
