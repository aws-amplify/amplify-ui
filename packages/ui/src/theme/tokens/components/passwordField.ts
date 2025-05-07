import type {
  DesignTokenProperties,
  OutputVariantKey,
} from '../types/designToken';

type StateTokens<Output> = DesignTokenProperties<
  'backgroundColor' | 'borderColor' | 'color',
  Output
>;

type StateWithShadowTokens<Output> = StateTokens<Output> &
  DesignTokenProperties<'boxShadow', Output>;

type ErrorStateTokens<Output> = DesignTokenProperties<
  'backgroundColor' | 'borderColor' | 'color',
  Output
> & {
  _hover?: StateTokens<Output>;
  _focus?: StateWithShadowTokens<Output>;
  _active?: StateTokens<Output>;
};

type ButtonTokens<Output> = DesignTokenProperties<'color', Output> & {
  _active?: StateTokens<Output>;
  _disabled?: StateTokens<Output>;
  _error?: ErrorStateTokens<Output>;
  _focus?: StateTokens<Output>;
  _hover?: StateTokens<Output>;
};

export type PasswordFieldTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<'color', Output> & {
    button?: ButtonTokens<Output>;
  };

export const passwordfield: Required<PasswordFieldTokens<'default'>> = {
  color: { value: '{components.fieldcontrol.color.value}' },
  button: {
    color: { value: '{components.button.color.value}' },
    _active: {
      backgroundColor: {
        value: '{components.button._active.backgroundColor.value}',
      },
      borderColor: { value: '{components.button._active.borderColor.value}' },
      color: { value: '{components.button._active.color.value}' },
    },
    _disabled: {
      backgroundColor: {
        value: '{components.button._disabled.backgroundColor.value}',
      },
      borderColor: {
        value: '{components.button._disabled.borderColor.value}',
      },
      color: { value: '{components.button._disabled.color.value}' },
    },
    _error: {
      color: { value: '{components.button.outlined.error.color.value}' },
      backgroundColor: {
        value: '{components.button.outlined.error.backgroundColor.value}',
      },
      borderColor: {
        value: '{components.button.outlined.error.borderColor.value}',
      },
      _active: {
        borderColor: {
          value: '{components.button.outlined.error._active.borderColor.value}',
        },
        backgroundColor: {
          value:
            '{components.button.outlined.error._active.backgroundColor.value}',
        },
        color: {
          value: '{components.button.outlined.error._active.color.value}',
        },
      },
      _focus: {
        borderColor: {
          value: '{components.button.outlined.error._focus.borderColor.value}',
        },
        backgroundColor: {
          value:
            '{components.button.outlined.error._focus.backgroundColor.value}',
        },
        color: {
          value: '{components.button.outlined.error._focus.color.value}',
        },
        boxShadow: {
          value: '{components.button.outlined.error._focus.boxShadow.value}',
        },
      },
      _hover: {
        borderColor: {
          value: '{components.button.outlined.error._hover.borderColor.value}',
        },
        backgroundColor: {
          value:
            '{components.button.outlined.error._hover.backgroundColor.value}',
        },
        color: {
          value: '{components.button.outlined.error._hover.color.value}',
        },
      },
    },
    _focus: {
      backgroundColor: {
        value: '{components.button._focus.backgroundColor.value}',
      },
      borderColor: { value: '{components.button._focus.borderColor.value}' },
      color: { value: '{components.button._focus.color.value}' },
    },
    _hover: {
      backgroundColor: {
        value: '{components.button._hover.backgroundColor.value}',
      },
      borderColor: { value: '{components.button._hover.borderColor.value}' },
      color: { value: '{components.button._hover.color.value}' },
    },
  },
};
