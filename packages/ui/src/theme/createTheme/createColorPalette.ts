import { ColorValues, ScaleKey } from '../tokens/colors';

/**
 * Takes a set of keys and a color name and returns an object of design tokens,
 * used for applying a primary color at the theme level to our tokens.
 *
 * createColorPalette({keys: ['10','20',...], value: 'red'})
 * returns {
 *   10: { value: '{colors.red.10.value}' },
 *   20: { value: '{colors.red.20.value}' },
 *   ...
 * }
 */
export function createColorPalette<
  ColorType extends ColorValues<ScaleKey, 'default'> = ColorValues<
    ScaleKey,
    'default'
  >,
>({ keys, value }: { keys: string[]; value: string }): ColorType {
  return keys.reduce((acc, key) => {
    return {
      ...acc,
      [key]: { value: `{colors.${value}.${key}.value}` },
    };
  }, {} as ColorType);
}
