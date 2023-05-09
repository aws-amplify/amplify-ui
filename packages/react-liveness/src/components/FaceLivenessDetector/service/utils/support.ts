/**
 * Checks whether WebAssembly is supported in the current environment.
 */
export function isWebAssemblySupported(): boolean {
  try {
    return (
      !!window.WebAssembly &&
      (!!window.WebAssembly.compile || !!window.WebAssembly.compileStreaming)
    );
  } catch (e) {
    return false;
  }
}
