'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ComponentPropsToStylePropsMap = void 0;
/**
 * Maps from component style props to React `style` props
 * Note: Primarily needed to map from component style props that don't match CSS Properties directly
 * such as wrap => flexWrap and direction => flexDirection
 */
exports.ComponentPropsToStylePropsMap = {
  alignContent: 'alignContent',
  alignItems: 'alignItems',
  alignSelf: 'alignSelf',
  backgroundColor: 'backgroundColor',
  border: 'border',
  borderRadius: 'borderRadius',
  boxShadow: 'boxShadow',
  color: 'color',
  direction: 'flexDirection',
  fontFamily: 'fontFamily',
  fontSize: 'fontSize',
  fontStyle: 'fontStyle',
  fontWeight: 'fontWeight',
  gap: 'gap',
  height: 'height',
  justifyContent: 'justifyContent',
  letterSpacing: 'letterSpacing',
  lineHeight: 'lineHeight',
  maxHeight: 'maxHeight',
  maxWidth: 'maxWidth',
  minHeight: 'minHeight',
  minWidth: 'minWidth',
  objectFit: 'objectFit',
  objectPosition: 'objectPosition',
  opacity: 'opacity',
  padding: 'padding',
  textDecoration: 'textDecoration',
  width: 'width',
  wrap: 'flexWrap',
};
//# sourceMappingURL=style.js.map
