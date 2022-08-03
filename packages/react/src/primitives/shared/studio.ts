/**
 * These utils and Types are owned by the Studio UI Builder team
 * When making changing to this file, please consult
 * a member from the Studio UI Builder team.
 */

export type EscapeHatchProps = {
  [elementHierarchy: string]: Record<string, unknown>;
};

type VariantValues = { [key: string]: string };
export type Variant = {
  variantValues: VariantValues;
  overrides: EscapeHatchProps;
};

/**
 * This method is used to parse through all of the overrides and
 * only pass the relevant child overrides for a given component.
 * @internal
 * @param overrides escape hatch props
 * @param elementHierarchy
 * @returns overrides only for specified element
 */
export const findChildOverrides = (
  overrides: EscapeHatchProps | null | undefined,
  elementHierarchy: string
): EscapeHatchProps | null => {
  if (!overrides) {
    return null;
  }

  const filteredOverrides = Object.entries(overrides).filter((m) =>
    m[0].startsWith(elementHierarchy)
  );

  return Object.assign(
    {},
    ...Array.from(filteredOverrides, ([k, v]) => ({
      [k.replace(elementHierarchy, '')]: v,
    }))
  ) as EscapeHatchProps;
};

/**
 * This helper method is used to get the overrides
 * that will be applied to a component
 * @internal
 * @param overrides escape hatch props
 * @param elementHierarchy
 * @returns component overrides
 */
export const getOverrideProps = (
  overrides: EscapeHatchProps | null | undefined,
  elementHierarchy: string
): EscapeHatchProps | null => {
  if (!overrides) {
    return null;
  }

  const componentOverrides = Object.entries(overrides)
    .filter(([key]) => key === elementHierarchy)
    .flatMap(([, value]) => Object.entries(value))
    .filter((m) => m?.[0]);

  return Object.fromEntries(componentOverrides) as unknown as EscapeHatchProps;
};

/**
 * Given a list of style variants, select a given one based on input props
 * @internal
 * @param variants list of style variants to select from
 * @param props variant values to select from the list, may include additional props, to tidy up usage upstream
 */
export function getOverridesFromVariants<T>(
  variants: Variant[],
  props: { [key: string]: T }
): { [key: string]: Variant } {
  // Get unique keys from the provided variants
  const variantValueKeys = [
    ...new Set(
      variants.flatMap((variant) => Object.keys(variant.variantValues))
    ),
  ];

  // Get variant value object from provided props, dropping keys that aren't in variantValueKeys, or whose vals are falsey
  const variantValuesFromProps: VariantValues = Object.keys(props)
    .filter((i) => variantValueKeys.includes(i) && props[i])
    .reduce((acc, key) => {
      acc[key] = props[key];
      return acc;
    }, {});

  const matchedVariants = variants.filter(({ variantValues }) => {
    return (
      Object.keys(variantValues).length ===
        Object.keys(variantValuesFromProps).length &&
      Object.entries(variantValues).every(
        ([key, value]) => variantValuesFromProps[key] === value
      )
    );
  });

  return matchedVariants.reduce((overrides, variant) => {
    return { ...overrides, ...variant.overrides };
  }, {});
}

/**
 * This helper method is used to merge
 * variants with overrides
 * @internal
 * @param variants
 * @param overrides
 * @returns merged variants with overrides
 */
export const mergeVariantsAndOverrides = (
  variants: EscapeHatchProps,
  overrides: EscapeHatchProps
): EscapeHatchProps => {
  if (!variants && !overrides) {
    return null;
  }
  if (!overrides) {
    return variants;
  }
  if (!variants) {
    return overrides;
  }
  const overrideKeys = new Set(Object.keys(overrides));
  const sharedKeys = Object.keys(variants).filter((variantKey) =>
    overrideKeys.has(variantKey)
  );
  const merged = Object.fromEntries(
    sharedKeys.map((sharedKey) => [
      sharedKey,
      { ...variants[sharedKey], ...overrides[sharedKey] },
    ])
  );
  return {
    ...variants,
    ...overrides,
    ...merged,
  };
};
