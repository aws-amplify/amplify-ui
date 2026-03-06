import type {
  DesignTokenProperties,
  OutputVariantKey,
} from '../types/designToken';

export interface AIConversationTokens<OutputType extends OutputVariantKey> {
  message?: DesignTokenProperties<
    | 'backgroundColor'
    | 'borderRadius'
    | 'paddingBlock'
    | 'paddingInline'
    | 'gap',
    OutputType
  > & {
    sender?: DesignTokenProperties<'gap', OutputType> & {
      username?: DesignTokenProperties<
        'color' | 'fontSize' | 'fontWeight',
        OutputType
      >;
      timestamp?: DesignTokenProperties<
        'color' | 'fontSize' | 'fontWeight',
        OutputType
      >;
    };
    actions?: DesignTokenProperties<'gap', OutputType>;
    body?: DesignTokenProperties<'gap', OutputType>;
    user?: DesignTokenProperties<'backgroundColor', OutputType>;
    assistant?: DesignTokenProperties<'backgroundColor', OutputType>;
  };
  form?: DesignTokenProperties<'gap' | 'padding', OutputType>;
  attachment?: DesignTokenProperties<
    | 'borderColor'
    | 'borderWidth'
    | 'borderRadius'
    | 'fontSize'
    | 'paddingBlock'
    | 'paddingInline'
    | 'gap',
    OutputType
  > & {
    list?: DesignTokenProperties<
      'paddingBlockStart' | 'padding' | 'gap',
      OutputType
    >;
    image?: DesignTokenProperties<'width' | 'height', OutputType>;
    size?: DesignTokenProperties<
      'color' | 'fontSize' | 'fontWeight',
      OutputType
    >;
    name?: DesignTokenProperties<
      'color' | 'fontSize' | 'fontWeight',
      OutputType
    >;
    remove?: DesignTokenProperties<'padding', OutputType>;
  };
}

export const aiConversation: Required<AIConversationTokens<'default'>> = {
  message: {
    backgroundColor: { value: '{colors.background.secondary.value}' },
    borderRadius: { value: '{radii.large.value}' },
    gap: { value: '{space.small.value}' },
    paddingBlock: { value: '{space.small.value}' },
    paddingInline: { value: '{space.small.value}' },
    user: {
      backgroundColor: { value: '{colors.background.secondary.value}' },
    },
    assistant: {
      backgroundColor: { value: '{colors.primary.10.value}' },
    },
    sender: {
      gap: { value: '{space.small.value}' },
      username: {
        color: { value: '{colors.font.primary.value}' },
        fontSize: { value: 'inherit' },
        fontWeight: { value: '{fontWeights.bold.value}' },
      },
      timestamp: {
        color: { value: '{colors.font.tertiary.value}' },
        fontSize: { value: 'inherit' },
        fontWeight: { value: 'inherit' },
      },
    },
    body: { gap: { value: '{space.xs.value}' } },
    actions: { gap: { value: '{space.xs.value}' } },
  },

  form: {
    gap: { value: '{space.small.value}' },
    padding: { value: '{space.small.value}' },
  },

  attachment: {
    borderColor: { value: '{colors.border.secondary.value}' },
    borderWidth: { value: '{borderWidths.small.value}' },
    borderRadius: { value: '{radii.small.value}' },
    fontSize: { value: '{fontSizes.small.value}' },
    paddingBlock: { value: '{space.xxxs.value}' },
    paddingInline: { value: '{space.xs.value}' },
    gap: { value: '{space.xs.value}' },

    list: {
      padding: { value: '{space.xs.value}' },
      paddingBlockStart: { value: '0' },
      gap: { value: '{space.xxs.value}' },
    },

    name: {
      color: { value: '{colors.font.primary.value}' },
      fontSize: { value: '{fontSizes.small.value}' },
      fontWeight: { value: '{fontWeights.normal.value}' },
    },

    size: {
      color: { value: '{colors.font.tertiary.value}' },
      fontSize: { value: '{fontSizes.small.value}' },
      fontWeight: { value: '{fontWeights.normal.value}' },
    },

    remove: {
      padding: { value: '{space.xxs.value}' },
    },

    image: {
      width: { value: '{fontSizes.medium.value}' },
      height: { value: '{fontSizes.medium.value}' },
    },
  },
};
