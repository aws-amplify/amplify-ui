import {
  ColorValue,
  DesignToken,
  FontSizeValue,
  SpaceValue,
  BorderWidthValue,
  BorderColorValue,
  TextAlignValue,
  BorderRadiusValue,
} from '../types/designToken';
import { TypographyTokens } from '../types/typography';

interface BaseDropZoneTokens {
  backgroundColor: DesignToken<ColorValue>;
  borderWidth: DesignToken<BorderWidthValue>;
  borderStyle: DesignToken<BorderColorValue>;
  borderColor: DesignToken<ColorValue>;
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

export interface FileUploaderTokens {
  dropzone: DropZoneTokens;
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
};
