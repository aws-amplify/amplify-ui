import { isFile, getPercentValue, resolveClassName } from '../utils';

describe('view utils', () => {
  it('uses isFile util to discern between files and folders', () => {
    const file = new File(['file contents'], 'test file', {
      type: 'text/plain',
    });
    const folder = new File([], 'test folder');

    expect(isFile(file)).toBe(true);
    expect(isFile(folder)).toBe(false);
  });

  it('uses getPercentValue util to calculate the percentage of a number', () => {
    expect(getPercentValue(0.01)).toBe(1);
    expect(getPercentValue(0.5)).toBe(50);
    expect(getPercentValue(1)).toBe(100);
  });

  it('uses resolveClassName util to resolve a className', () => {
    const stringClassName = 'test-class';
    const resolvedStringClassName = resolveClassName(
      'default',
      stringClassName
    );

    expect(resolvedStringClassName).toBe('default test-class');

    const functionClassName = () => 'test-class';
    const resolvedFunctionClassName = resolveClassName(
      'default',
      functionClassName
    );

    expect(resolvedFunctionClassName).toBe('test-class');
  });
});
