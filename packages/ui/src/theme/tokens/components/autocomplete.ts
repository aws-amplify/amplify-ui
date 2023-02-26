import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

export type AutocompleteTokens<OutputType extends OutputVariantKey> = {
  menu?: DesignTokenProperties<
    | 'backgroundColor'
    | 'borderColor'
    | 'borderRadius'
    | 'borderStyle'
    | 'borderWidth'
    | 'marginBlockStart'
    | 'width',
    OutputType
  > & {
    options?: DesignTokenProperties<
      'display' | 'flexDirection' | 'maxHeight',
      OutputType
    >;
    option?: DesignTokenProperties<
      | 'backgroundColor'
      | 'color'
      | 'cursor'
      | 'transitionDuration'
      | 'transitionProperty'
      | 'transitionTimingFunction',
      OutputType
    > & {
      _active?: DesignTokenProperties<'backgroundColor' | 'color', OutputType>;
    };
    _empty?: DesignTokenProperties<'display', OutputType>;
    _loading?: DesignTokenProperties<
      'alignItems' | 'display' | 'gap',
      OutputType
    >;
    spaceShared?: DesignTokenProperties<
      'paddingBlock' | 'paddingInline',
      OutputType
    >;
  };
};

export const autocomplete: Required<AutocompleteTokens<'default'>> = {
  menu: {
    width: { value: '100%' },
    marginBlockStart: { value: '{space.xxxs}' },
    backgroundColor: { value: '{colors.background.primary}' },
    borderColor: { value: '{colors.border.primary}' },
    borderWidth: { value: '{borderWidths.small}' },
    borderStyle: { value: 'solid' },
    borderRadius: { value: '{radii.small}' },
    options: {
      display: { value: 'flex' },
      flexDirection: { value: 'column' },
      maxHeight: { value: '300px' },
    },
    option: {
      backgroundColor: { value: '{colors.background.primary}' },
      color: { value: 'currentcolor' },
      cursor: { value: 'pointer' },
      transitionDuration: { value: '{time.short}' },
      transitionProperty: { value: 'background-color, color' },
      transitionTimingFunction: { value: 'ease' },
      _active: {
        backgroundColor: { value: '{colors.brand.primary.80}' },
        color: { value: '{colors.white}' },
      },
    },
    _empty: {
      display: { value: 'flex' },
    },
    _loading: {
      alignItems: { value: 'center' },
      display: { value: 'flex' },
      gap: { value: '{space.xxxs}' },
    },
    spaceShared: {
      paddingBlock: { value: '{space.xs}' },
      paddingInline: { value: '{space.small}' },
    },
  },
};
