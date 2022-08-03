import {
  getOverrideProps,
  getOverridesFromVariants,
  mergeVariantsAndOverrides,
  EscapeHatchProps,
  Variant,
} from '../studio';

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

describe('mergeVariantsAndOverrides', () => {
  const expected: EscapeHatchProps = {
    'Flex.Button[0]': {
      color: 'red',
      size: 'large',
    },
    'Flex.CheckBox[1]': {
      isEnabled: 'false',
      size: 'large',
    },
  };
  it('should return merged variants after applying overrides', () => {
    const variants: EscapeHatchProps = {
      'Flex.Button[0]': {
        color: 'red',
      },
      'Flex.CheckBox[1]': {
        isEnabled: 'false',
        size: 'small',
      },
    };

    const overrides: EscapeHatchProps = {
      'Flex.Button[0]': {
        size: 'large',
      },
      'Flex.CheckBox[1]': {
        size: 'large',
      },
    };

    expect(mergeVariantsAndOverrides(variants, overrides)).toEqual(expected);
  });

  it('should return merged variants when override includes new control', () => {
    const variants: EscapeHatchProps = {
      'Flex.Button[0]': {
        color: 'red',
        size: 'large',
      },
    };

    const overrides: EscapeHatchProps = {
      'Flex.CheckBox[1]': {
        isEnabled: 'false',
        size: 'large',
      },
    };

    expect(mergeVariantsAndOverrides(variants, overrides)).toEqual(expected);
  });

  it('should return merged variants when all variants overridden', () => {
    const variants: EscapeHatchProps = {
      'Flex.Button[0]': {
        color: 'green',
        size: 'small',
      },
      'Flex.CheckBox[1]': {
        isEnabled: 'true',
        size: 'small',
      },
    };

    const overrides: EscapeHatchProps = {
      ...expected,
    };

    expect(mergeVariantsAndOverrides(variants, overrides)).toEqual(expected);
  });

  it('should return original variants when override is empty', () => {
    const variants: EscapeHatchProps = {
      ...expected,
    };

    const overrides: EscapeHatchProps = {};

    expect(mergeVariantsAndOverrides(variants, overrides)).toEqual(expected);
  });

  it('should return original variants when override is null', () => {
    const variants: EscapeHatchProps = {
      ...expected,
    };

    // cast null as EscapeHatchProps for exhaustive test case
    expect(
      mergeVariantsAndOverrides(variants, null as unknown as EscapeHatchProps)
    ).toEqual(expected);
  });

  it('should return overrides when variant is null', () => {
    const overrides: EscapeHatchProps = {
      ...expected,
    };

    // cast null as EscapeHatchProps for exhaustive test case
    expect(
      mergeVariantsAndOverrides(null as unknown as EscapeHatchProps, overrides)
    ).toEqual(expected);
  });

  it('should return null when both variant & override are null', () => {
    expect(
      // cast null as EscapeHatchProps for exhaustive test case
      mergeVariantsAndOverrides(
        null as unknown as EscapeHatchProps,
        null as unknown as EscapeHatchProps
      )
    ).toEqual(null);
  });
});
