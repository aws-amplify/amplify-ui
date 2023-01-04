/**
 * Utility for simplifying usage of feature flags defined in _next.config.js_
 * Example usage:
 * - Create a feature flag constant:
 * ```
 * const IS_REACT_NATIVE_ENABLED = process.env.FF_REACT_NATIVE === 'TRUE';
 * ```
 * - Add it to the default export:
 * ```
 * const FEATURE_FLAGS = { IS_REACT_NATIVE_ENABLED };
 * ```
 * - Use in a file where the feature flag should define behavior:
 * ```
 * const shouldRenderReactNativeContent = FEATURE_FLAGS.IS_REACT_NATIVE_ENABLED;
 * ```
 */

const IS_FILEUPLOADER_COMPONENTS_ENABLED =
  process.env.FF_FILEUPLOADER_COMPONENTS_ENABLED === 'TRUE';

const FEATURE_FLAGS = { IS_FILEUPLOADER_COMPONENTS_ENABLED };

export default FEATURE_FLAGS;
