'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var utils_1 = require('../utils');
var types_1 = require('../../types');
var props = {
  backgroundColor: 'blue',
  border: '1px solid black',
  borderRadius: '6px',
  boxShadow: '3px 3px 5px 6px #ccc',
  color: 'red',
  height: '100px',
  maxHeight: '200px',
  maxWidth: '200px',
  minHeight: '100px',
  minWidth: '100px',
  opacity: '80%',
  padding: '6px',
  width: '100px',
  as: 'section',
  ariaLabel: 'important section',
  className: 'my-section',
};
describe('convertStylePropsToStyleObj: ', function () {
  it('should convert style props to a style object', function () {
    var style = utils_1.convertStylePropsToStyleObj(props);
    Object.keys(types_1.ComponentPropsToStylePropsMap).forEach(function (prop) {
      expect(style[prop]).toBe(props[prop]);
    });
    expect(style['as']).toBeUndefined();
  });
  it('should ignore undefined, null or empty string style prop values', function () {
    var props = {
      backgroundColor: undefined,
      color: null,
      border: '',
      borderRadius: '6px',
      ariaLabel: 'important section',
      as: 'section',
    };
    var style = utils_1.convertStylePropsToStyleObj(props);
    expect(style['backgroundColor']).toBeUndefined();
    expect(style['color']).toBeUndefined();
    expect(style['border']).toBeUndefined();
    expect(style['borderRadius']).toBe(props.borderRadius);
    expect(style['as']).toBeUndefined();
  });
  it('should extend the passed in style object', function () {
    var props = {
      backgroundColor: 'red',
    };
    var existingStyles = {
      color: 'blue',
    };
    var style = utils_1.convertStylePropsToStyleObj(props, existingStyles);
    expect(style['backgroundColor']).toBe('red');
    expect(style['color']).toBe('blue');
  });
  it('should give precedence to the stylistic props over the passed in style object', function () {
    var props = {
      color: 'red',
      fontWeight: 'bold',
    };
    var existingStyles = {
      color: 'blue',
      backgroundColor: 'yellow',
    };
    var style = utils_1.convertStylePropsToStyleObj(props, existingStyles);
    expect(style['backgroundColor']).toBe('yellow');
    expect(style['color']).toBe('red');
    expect(style['fontWeight']).toBe('bold');
  });
});
describe('getNonStyleProps: ', function () {
  it('should return an object containing only the non style props', function () {
    var nonStyleProps = utils_1.getNonStyleProps(props);
    expect(nonStyleProps['border']).toBeUndefined();
    expect(nonStyleProps['as']).toBe(props.as);
    expect(nonStyleProps['ariaLabel']).toBe(props.ariaLabel);
    expect(nonStyleProps['className']).toBe(props.className);
  });
  it('should return an empty object if only style props are passed in', function () {
    var allStyleProps = {
      color: 'red',
      backgroundColor: 'blue',
      fontWeight: 'bold',
    };
    var nonStyleProps = utils_1.getNonStyleProps(allStyleProps);
    expect(nonStyleProps).toEqual({});
  });
  it('should return a copy of the original object if all non style props are passed in', function () {
    var _a;
    var noStyleProps =
      ((_a = {}),
      (_a['data-variation'] = 'primary'),
      (_a.ariaLabel = props.ariaLabel),
      (_a.as = props.as),
      _a);
    var nonStyleProps = utils_1.getNonStyleProps(noStyleProps);
    expect(nonStyleProps).toEqual(noStyleProps);
    expect(nonStyleProps).not.toBe(noStyleProps);
  });
});
describe('getConsecutiveIntArray: ', function () {
  it('should return an array of consecutive integer', function () {
    var array = utils_1.getConsecutiveIntArray(1, 5);
    expect(array).toEqual([1, 2, 3, 4, 5]);
  });
  it('should return an array with a single entry', function () {
    var array = utils_1.getConsecutiveIntArray(1, 1);
    expect(array).toEqual([1]);
  });
  it('should return an empty array when the starting integer is larger than the ending integer', function () {
    var array = utils_1.getConsecutiveIntArray(5, 1);
    expect(array).toEqual([]);
  });
});
describe('strHasLength: ', function () {
  it('should return false for none string types', function () {
    var noneStringTypes = [undefined, null, 1, true, {}, [], function () {}];
    noneStringTypes.forEach(function (type) {
      expect(utils_1.strHasLength(type)).toBe(false);
    });
  });
  it('should return false for strings with 0 length', function () {
    expect(utils_1.strHasLength('')).toBe(false);
  });
  it('should return true for strings with a length', function () {
    expect(utils_1.strHasLength('some string')).toBe(true);
  });
});
//# sourceMappingURL=utils.test.js.map
