import {
  ColorValue,
  DesignToken,
  FontSizeValue,
  SpaceValue,
  BorderWidthValue,
  TextAlignValue,
  BorderRadiusValue,
  BorderStyleValue,
  AlignItemsValue,
  StrokeLinecapValue,
  JustifyContentValue,
} from '../types/designToken';
import { TypographyTokens } from '../types/typography';

interface BaseDropZoneTokens {
  backgroundColor: DesignToken<ColorValue>;
  borderWidth: DesignToken<BorderWidthValue>;
  borderStyle: DesignToken<BorderStyleValue>;
  borderColor: DesignToken<BorderColorValue>;
  borderRadius: DesignToken<BorderRadiusValue>;
}

interface DropZoneTokens extends BaseDropZoneTokens {
  gap: DesignToken<SpaceValue>;
  paddingInline: DesignToken<SpaceValue>;
  paddingBlock: DesignToken<SpaceValue>;
  textAlign: DesignToken<TextAlignValue>;

  _active: BaseDropZoneTokens;

  icon: {
    fontSize: DesignToken<FontSizeValue>;
    color: DesignToken<ColorValue>;
  };

  text: TypographyTokens;
}

interface FileNameTokens extends TypographyTokens {}

interface FileSizeTokens extends TypographyTokens {}

interface FileImageTokens {
  backgroundColor: DesignToken<ColorValue>;
  borderRadius: DesignToken<BorderRadiusValue>;
  color: DesignToken<ColorValue>;
  height: DesignToken<SpaceValue>;
  width: DesignToken<SpaceValue>;
}

interface FileUploaderFileTokens {
  backgroundColor: DesignToken<ColorValue>;
  borderWidth: DesignToken<BorderWidthValue>;
  borderColor: DesignToken<ColorValue>;
  borderStyle: DesignToken<BorderStyleValue>;
  borderRadius: DesignToken<BorderRadiusValue>;
  paddingInline: DesignToken<SpaceValue>;
  paddingBlock: DesignToken<SpaceValue>;
  gap: DesignToken<SpaceValue>;
  alignItems: DesignToken<AlignItemsValue>;

  name: FileNameTokens;
  size: FileSizeTokens;
  image: FileImageTokens;
}

interface FileUploaderLoaderTokens {
  strokeWidth: DesignToken<SpaceValue>;
  strokeFilled: DesignToken<ColorValue>;
  strokeEmpty: DesignToken<ColorValue>;
  strokeLinecap: DesignToken<StrokeLinecapValue>;
}

interface FileUploaderPreviewerTokens {
  maxHeight: DesignToken<SpaceValue>;
  maxWidth: DesignToken<SpaceValue>;
  backgroundColor: DesignToken<ColorValue>;
  borderWidth: DesignToken<BorderWidthValue>;
  borderColor: DesignToken<BorderColorValue>;
  borderStyle: DesignToken<BorderStyleValue>;
  borderRadius: DesignToken<BorderRadiusValue>;
  paddingInline: DesignToken<SpaceValue>;
  paddingBlock: DesignToken<SpaceValue>;

  text: TypographyTokens;

  body: {
    gap: DesignToken<SpaceValue>;
    paddingInline: DesignToken<SpaceValue>;
    paddingBlock: DesignToken<SpaceValue>;
  };

  footer: {
    paddingInline: DesignToken<SpaceValue>;
    paddingBlock: DesignToken<SpaceValue>;
    justifyContent: DesignToken<JustifyContentValue>;
    borderWidth: DesignToken<BorderWidthValue>;
    borderColor: DesignToken<ColorValue>;
    borderStyle: DesignToken<BorderStyleValue>;
  };
}

export interface FileUploaderTokens {
  dropzone: DropZoneTokens;
  file: FileUploaderFileTokens;
  loader: FileUploaderLoaderTokens;
  previewer: FileUploaderPreviewerTokens;
}

export const fileuploader: FileUploaderTokens = {
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
      backgroundColor: { value: '{colors.brand.primary.10}' },
      borderRadius: {
        value: '{components.fileuploader.dropzone.borderRadius}',
      },
      borderColor: { value: '{colors.border.pressed}' },
      borderStyle: { value: '{components.fileuploader.dropzone.borderStyle}' },
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
    alignItems: { value: 'center' },

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
    maxWidth: { value: '30rem' },

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
      borderColor: { value: '{colors.border.secondary}' },
      borderStyle: { value: 'solid' },
      borderWidth: { value: '{borderWidths.small}' },
      paddingBlock: { value: '{space.medium}' },
      paddingInline: { value: '{space.medium}' },
      justifyContent: { value: 'space-between' },
    },
  },
};
