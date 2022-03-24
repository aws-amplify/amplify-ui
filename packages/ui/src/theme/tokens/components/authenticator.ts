import {
  BackgroundColorValue,
  BorderColorValue,
  BorderStyleValue,
  BorderWidthValue,
  BoxShadowValue,
  ColorValue,
  DesignToken,
  SpaceValue,
} from '../types/designToken';

export interface AuthenticatorTokens {
  maxWidth: DesignToken<SpaceValue>;
  modal: {
    width: DesignToken<SpaceValue>;
    height: DesignToken<SpaceValue>;
    backgroundColor: DesignToken<ColorValue>;
    top: DesignToken<SpaceValue>;
    left: DesignToken<SpaceValue>;
  };
  container: {
    widthMax: DesignToken<SpaceValue>;
  };
  router: {
    borderWidth: DesignToken<BorderWidthValue>;
    borderStyle: DesignToken<BorderStyleValue>;
    borderColor: DesignToken<BorderColorValue>;
    backgroundColor: DesignToken<BackgroundColorValue>;
    boxShadow: DesignToken<BoxShadowValue>;
  };
  footer: {
    paddingBottom: DesignToken<SpaceValue>;
  };
  form: {
    padding: DesignToken<SpaceValue>;
  };
  state: {
    inactive: {
      backgroundColor: DesignToken<BackgroundColorValue>;
    };
  };
  orContainer: {
    color: DesignToken<ColorValue>;
    orLine: {
      backgroundColor: DesignToken<BackgroundColorValue>;
    };
  };
}

export const authenticator: AuthenticatorTokens = {
  maxWidth: { value: '60rem' },
  modal: {
    width: { value: '{space.relative.full}' },
    height: { value: '{space.relative.full}' },
    backgroundColor: { value: '{colors.overlay.50.value}' },
    top: { value: '{space.zero}' },
    left: { value: '{space.zero}' },
  },
  container: {
    widthMax: { value: '30rem' },
  },
  router: {
    borderWidth: { value: '{borderWidths.small.value}' },
    borderStyle: { value: 'solid' },
    borderColor: { value: '{colors.border.primary.value}' },
    backgroundColor: { value: '{colors.background.primary.value}' },
    boxShadow: { value: '{shadows.medium.value}' },
  },
  footer: {
    paddingBottom: { value: '{space.medium.value}' },
  },
  form: {
    padding: { value: '{space.xl.value}' },
  },
  state: {
    inactive: {
      backgroundColor: { value: '{colors.background.secondary.value}' },
    },
  },
  orContainer: {
    color: { value: '{colors.neutral.80.value}' },
    orLine: {
      backgroundColor: { value: '{colors.background.primary.value}' },
    },
  },
};
