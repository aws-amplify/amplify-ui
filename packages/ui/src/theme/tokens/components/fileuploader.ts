import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';
import { TypographyTokens } from '../types/typography';

type BaseDropZoneTokens<OutputType> = DesignTokenProperties<
  | 'backgroundColor'
  | 'borderWidth'
  | 'borderStyle'
  | 'borderColor'
  | 'borderRadius',
  OutputType
>;
export interface FileUploaderTokens<OutputType extends OutputVariantKey> {
  dropzone?: DesignTokenProperties<
    'gap' | 'paddingBlock' | 'paddingInline' | 'textAlign',
    OutputType
  > &
    BaseDropZoneTokens<OutputType> & {
      _active?: BaseDropZoneTokens<OutputType>;

      icon?: DesignTokenProperties<'fontSize' | 'color', OutputType>;

      text?: TypographyTokens<OutputType>;
    };
  file?: DesignTokenProperties<
    | 'alignItems'
    | 'backgroundColor'
    | 'borderColor'
    | 'borderRadius'
    | 'borderStyle'
    | 'borderWidth'
    | 'gap'
    | 'paddingBlock'
    | 'paddingInline',
    OutputType
  > & {
    name?: TypographyTokens<OutputType>;
    size?: TypographyTokens<OutputType>;
    image?: DesignTokenProperties<
      'backgroundColor' | 'borderRadius' | 'color' | 'height' | 'width',
      OutputType
    >;
  };
  filelist?: DesignTokenProperties<'flexDirection' | 'gap'>;
  loader?: DesignTokenProperties<
    'strokeWidth' | 'strokeFilled' | 'strokeEmpty' | 'strokeLinecap',
    OutputType
  >;

  previewer?: DesignTokenProperties<
    | 'backgroundColor'
    | 'borderColor'
    | 'borderRadius'
    | 'borderStyle'
    | 'borderWidth'
    | 'maxHeight'
    | 'maxWidth'
    | 'paddingBlock'
    | 'paddingInline',
    OutputType
  > & {
    text?: TypographyTokens<OutputType>;

    body?: DesignTokenProperties<
      'gap' | 'paddingInline' | 'paddingBlock',
      OutputType
    >;
    footer?: DesignTokenProperties<'justifyContent', OutputType>;
  };
}

export const fileuploader: Required<FileUploaderTokens<'default'>> = {
  dropzone: {
    backgroundColor: { value: '{colors.background.primary}' },
    borderRadius: { value: '{radii.small}' },
    borderColor: { value: '{colors.border.primary}' },
    borderStyle: { value: 'dashed' },
    borderWidth: { value: '{borderWidths.small}' },
    gap: { value: '{space.small}' },
    paddingBlock: { value: '{space.xl}' },
    paddingInline: { value: '{space.large}' },
    textAlign: { value: 'center' },

    _active: {
      backgroundColor: { value: '{colors.primary.10}' },
      borderRadius: {
        value: '{components.fileuploader.dropzone.borderRadius}',
      },
      borderColor: { value: '{colors.border.pressed}' },
      borderStyle: {
        value: '{components.fileuploader.dropzone.borderStyle}',
      },
      borderWidth: { value: '{borderWidths.medium}' },
    },

    icon: {
      color: { value: '{colors.border.primary}' },
      fontSize: { value: '{fontSizes.xxl}' },
    },

    text: {
      color: { value: '{colors.font.tertiary}' },
      fontSize: { value: '{fontSizes.medium}' },
      fontWeight: { value: '{fontWeights.bold}' },
    },
  },

  file: {
    backgroundColor: { value: '{colors.background.primary}' },
    borderRadius: { value: '{radii.small}' },
    borderColor: { value: '{colors.border.primary}' },
    borderStyle: { value: 'solid' },
    borderWidth: { value: '{borderWidths.small}' },
    paddingBlock: { value: '{space.xs}' },
    paddingInline: { value: '{space.small}' },
    gap: { value: '{space.small}' },
    alignItems: { value: 'baseline' },

    name: {
      fontSize: { value: '{fontSizes.medium}' },
      fontWeight: { value: '{fontWeights.bold}' },
      color: { value: '{colors.font.primary}' },
    },

    size: {
      fontSize: { value: '{fontSizes.small}' },
      fontWeight: { value: '{fontWeights.normal}' },
      color: { value: '{colors.font.tertiary}' },
    },

    image: {
      width: { value: '{space.xxl}' },
      height: { value: '{space.xxl}' },
      backgroundColor: { value: '{colors.background.secondary}' },
      color: { value: '{colors.font.tertiary}' },
      borderRadius: { value: '{radii.small}' },
    },
  },
  filelist: {
    flexDirection: { value: 'column' },
    gap: { value: '{space.small}' },
  },
  loader: {
    strokeLinecap: { value: 'round' },
    strokeEmpty: { value: '{colors.border.secondary}' },
    strokeFilled: { value: '{components.loader.strokeFilled}' },
    strokeWidth: { value: '{borderWidths.large}' },
  },
  previewer: {
    backgroundColor: { value: '{colors.background.primary}' },
    borderColor: { value: '{colors.border.primary}' },
    borderStyle: { value: 'solid' },
    borderWidth: { value: '{borderWidths.small}' },
    borderRadius: { value: '{radii.small}' },
    paddingBlock: { value: '{space.zero}' },
    paddingInline: { value: '{space.zero}' },
    maxHeight: { value: '40rem' },
    maxWidth: { value: 'auto' },

    text: {
      fontSize: { value: '{fontSizes.medium}' },
      fontWeight: { value: '{fontWeights.bold}' },
      color: { value: '{colors.font.primary}' },
    },

    body: {
      paddingBlock: { value: '{space.medium}' },
      paddingInline: { value: '{space.medium}' },
      gap: { value: '{space.small}' },
    },
    footer: {
      justifyContent: { value: 'flex-end' },
    },
  },
};
