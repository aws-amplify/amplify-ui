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
const FEATURE_FLAGS = {};

export default FEATURE_FLAGS;
