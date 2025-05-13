import type {
  DesignTokenProperties,
  OutputVariantKey,
} from '../types/designToken';

type BaseDropZoneTokens<OutputType> = DesignTokenProperties<
  | 'backgroundColor'
  | 'borderColor'
  | 'borderRadius'
  | 'borderWidth'
  | 'borderStyle'
  | 'color',
  OutputType
>;

export type DropZoneTokens<OutputType extends OutputVariantKey> =
  DesignTokenProperties<
    'gap' | 'paddingBlock' | 'paddingInline' | 'textAlign',
    OutputType
  > &
    BaseDropZoneTokens<OutputType> & {
      _active?: BaseDropZoneTokens<OutputType>;
      _disabled?: BaseDropZoneTokens<OutputType>;
      accepted?: BaseDropZoneTokens<OutputType>;
      rejected?: BaseDropZoneTokens<OutputType>;
    };
export const dropzone: Required<DropZoneTokens<'default'>> = {
  backgroundColor: { value: '{colors.background.primary}' },
  borderRadius: { value: '{radii.small}' },
  borderColor: { value: '{colors.border.primary}' },
  borderStyle: { value: 'dashed' },
  borderWidth: { value: '{borderWidths.small}' },
  color: { value: '{colors.font.primary}' },
  gap: { value: '{space.small}' },
  paddingBlock: { value: '{space.xl}' },
  paddingInline: { value: '{space.large}' },
  textAlign: { value: 'center' },

  _active: {
    backgroundColor: { value: '{colors.primary.10}' },
    borderRadius: { value: '{components.dropzone.borderRadius}' },
    borderColor: { value: '{colors.border.pressed}' },
    borderStyle: { value: '{components.dropzone.borderStyle}' },
    borderWidth: { value: '{components.dropzone.borderWidth}' },
    color: { value: '{colors.font.primary}' },
  },
  _disabled: {
    backgroundColor: { value: '{colors.background.disabled}' },
    borderRadius: { value: '{components.dropzone.borderRadius}' },
    borderColor: { value: '{colors.border.disabled}' },
    borderStyle: { value: '{components.dropzone.borderStyle}' },
    borderWidth: { value: '{components.dropzone.borderWidth}' },
    color: { value: '{colors.font.disabled}' },
  },
  accepted: {
    backgroundColor: { value: '{colors.background.success}' },
    borderRadius: { value: '{components.dropzone.borderRadius}' },
    borderColor: { value: '{colors.border.success}' },
    borderStyle: { value: '{components.dropzone.borderStyle}' },
    borderWidth: { value: '{components.dropzone.borderWidth}' },
    color: { value: '{colors.font.success}' },
  },
  rejected: {
    backgroundColor: { value: '{colors.background.error}' },
    borderRadius: { value: '{components.dropzone.borderRadius}' },
    borderColor: { value: '{colors.border.pressed}' },
    borderStyle: { value: '{components.dropzone.borderStyle}' },
    borderWidth: { value: '{components.dropzone.borderWidth}' },
    color: { value: '{colors.font.error}' },
  },
};
