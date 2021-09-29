import { getConsecutiveIntArray, strHasLength } from '../utils';
import { ViewProps } from '../../types';

const props: ViewProps = {
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

describe('getConsecutiveIntArray: ', () => {
  it('should return an array of consecutive integer', () => {
    const array = getConsecutiveIntArray(1, 5);
    expect(array).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return an array with a single entry', () => {
    const array = getConsecutiveIntArray(1, 1);
    expect(array).toEqual([1]);
  });

  it('should return an empty array when the starting integer is larger than the ending integer', () => {
    const array = getConsecutiveIntArray(5, 1);
    expect(array).toEqual([]);
  });
});

describe('strHasLength: ', () => {
  it('should return false for none string types', () => {
    const noneStringTypes = [undefined, null, 1, true, {}, [], () => {}];
    noneStringTypes.forEach((type) => {
      expect(strHasLength(type)).toBe(false);
    });
  });

  it('should return false for strings with 0 length', () => {
    expect(strHasLength('')).toBe(false);
  });

  it('should return true for strings with a length', () => {
    expect(strHasLength('some string')).toBe(true);
  });
});
