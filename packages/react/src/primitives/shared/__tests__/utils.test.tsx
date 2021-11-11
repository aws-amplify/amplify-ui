import { ViewProps } from '../../types';
import {
  getConsecutiveIntArray,
  getOverrideProps,
  getOverridesFromVariants,
  strHasLength,
} from '../utils';

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

describe('getOverrideProps', () => {
  const overrides = {
    View: {
      width: '436px',
      padding: '0px 0px 0px 0px',
      backgroundColor: 'rgba(50.36245197057724,0,251.81250303983688,1)',
      overflow: 'hidden',
      position: 'relative',
      height: '98px',
    },
    'View.Text[0]': {
      fontSize: '12px',
      color: 'red',
    },
  };

  it('returns the correct overrides when path matches', () => {
    const result = getOverrideProps(overrides, 'View');
    expect(result).toEqual({
      width: '436px',
      padding: '0px 0px 0px 0px',
      backgroundColor: 'rgba(50.36245197057724,0,251.81250303983688,1)',
      overflow: 'hidden',
      position: 'relative',
      height: '98px',
    });
  });

  it('returns the correct overrides when path matches complex', () => {
    const result = getOverrideProps(overrides, 'View.Text[0]');
    expect(result).toEqual({
      fontSize: '12px',
      color: 'red',
    });
  });

  it('returns an empty object when nothing matches', () => {
    const result = getOverrideProps(overrides, 'Flex');
    expect(result).toEqual({});
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

  it('should match on expected variants even with additional props', () => {
    const selectedVariantValue = { variant: 'primary', unexpected: 'yes' };
    const expected = {
      Button: {
        fontSize: '12px',
      },
    };
    expect(getOverridesFromVariants(variants, selectedVariantValue)).toEqual(
      expected
    );
  });

  it('should match on expected variants with optional even with additional props', () => {
    const selectedVariantValue = {
      variant: 'primary',
      size: 'large',
      unexpected: 'yes',
    };
    const expected = {
      Button: {
        width: '500',
      },
    };
    expect(getOverridesFromVariants(variants, selectedVariantValue)).toEqual(
      expected
    );
  });

  it('should match on expected variants with undefined for optional', () => {
    const selectedVariantValue = {
      variant: 'primary',
      size: undefined,
      unexpected: 'yes',
    };
    const expected = {
      Button: {
        fontSize: '12px',
      },
    };
    expect(getOverridesFromVariants(variants, selectedVariantValue)).toEqual(
      expected
    );
  });
});
