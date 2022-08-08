import type { Variant } from '../types';
import { getOverridesFromVariants } from '../getOverridesFromVariants';

describe('getOverridesFromVariants', () => {
  const variants: Variant[] = [
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
