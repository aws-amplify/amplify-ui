import {
  getConsecutiveIntArray,
  getOverridesFromVariants,
  strHasLength,
  VariantValues,
} from '../utils';
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

describe('getOverridesFromVariants', () => {
  const variants = [
    {
      variantValues: {
        variant: 'primary',
      },
      overrides: {
        Button: {
          fontSize: '12px',
        },
      },
    },
    {
      variantValues: {
        variant: 'secondary',
      },
      overrides: {
        Button: {
          fontSize: '40px',
        },
      },
    },
    {
      variantValues: {
        variant: 'primary',
        size: 'large',
      },
      overrides: {
        Button: {
          width: '500',
        },
      },
    },
  ];

  it('should return overrides for primary variant, without optional', () => {
    const selectedVariantValue = { variant: 'primary' };
    const expected = {
      Button: {
        fontSize: '12px',
      },
    };
    expect(getOverridesFromVariants(variants, selectedVariantValue)).toEqual(
      expected
    );
  });

  it('should return overrides for alternative', () => {
    const selectedVariantValue = { variant: 'secondary' };
    const expected = {
      Button: {
        fontSize: '40px',
      },
    };
    expect(getOverridesFromVariants(variants, selectedVariantValue)).toEqual(
      expected
    );
  });

  it('should return overrides for multiple values, including optional', () => {
    const selectedVariantValue = { variant: 'primary', size: 'large' };
    const expected = {
      Button: {
        width: '500',
      },
    };
    expect(getOverridesFromVariants(variants, selectedVariantValue)).toEqual(
      expected
    );
  });

  it('should return no overrides invalid combo', () => {
    const selectedVariantValue = { variant: 'secondary', size: 'large' };
    const expected = {};
    expect(getOverridesFromVariants(variants, selectedVariantValue)).toEqual(
      expected
    );
  });

  it('should return no overrides on unexpected variant parameter', () => {
    const selectedVariantValue = { unexpected: 'yes' };
    const expected = {};
    expect(getOverridesFromVariants(variants, selectedVariantValue)).toEqual(
      expected
    );
  });
});
