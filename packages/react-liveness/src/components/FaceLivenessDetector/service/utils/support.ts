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

/**
 * Checks whether WebGL is supported in the current environment.
 */
export function isWebGLSupported(): boolean {
  /**
   * Attributes expected to be present on a WebGL context
   * as per the tensorflowjs webgl backend
   * REF: https://github.com/tensorflow/tfjs/blob/master/tfjs-backend-webgl/src/canvas_util.ts#L20
   */
  const WEBGL_ATTRIBUTES: WebGLContextAttributes = {
    alpha: false,
    antialias: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    depth: false,
    stencil: false,
    failIfMajorPerformanceCaveat: true,
  };

  const canvas = document.createElement('canvas');
  const context =
    canvas.getContext('webgl', WEBGL_ATTRIBUTES) ??
    canvas.getContext('experimental-webgl', WEBGL_ATTRIBUTES) ??
    canvas.getContext('webgl2', WEBGL_ATTRIBUTES);

  return !!context;
}
