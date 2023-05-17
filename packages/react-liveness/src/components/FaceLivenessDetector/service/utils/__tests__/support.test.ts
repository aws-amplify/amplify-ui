import { isWebAssemblySupported } from '../support';

const WA_POINTER = window.WebAssembly;
const WA_COMPILE = window.WebAssembly.compile;
const WA_COMPILE_STREAMING = window.WebAssembly.compileStreaming;

describe('isWebAssemblySupported', () => {
  afterEach(() => {
    WA_POINTER.compile = WA_COMPILE;
    WA_POINTER.compileStreaming = WA_COMPILE_STREAMING;
    window.WebAssembly = WA_POINTER;
  });
  it('should return true if it has WebAssembly support on the window', () => {
    const result = isWebAssemblySupported();
    expect(result).toBe(true);
  });

  it('should return false if window does not have WebAssembly', () => {
    (window as any).WebAssembly = undefined;
    const result = isWebAssemblySupported();
    expect(result).toBe(false);
  });

  it('should return false WebAssembly does not have required functions', () => {
    (window.WebAssembly as any).compile = undefined;
    (window.WebAssembly as any).compileStreaming = undefined;
    const result = isWebAssemblySupported();
    expect(result).toBe(false);
  });

  it('should return true if WebAssembly does have at least one required function', () => {
    (window.WebAssembly as any).compile = undefined;
    (window.WebAssembly as any).compileStreaming = () => {};
    const result = isWebAssemblySupported();
    expect(result).toBe(true);
  });
});
