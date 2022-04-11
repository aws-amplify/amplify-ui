import {
  DesignToken,
  ColorValue,
  SpaceValue,
  BorderWidthValue,
  BorderColorValue,
  BackgroundColorValue,
  BorderStyleValue,
  BoxShadowValue,
} from '../types/designToken';

interface AuthenticatorModalTokens {
  width: DesignToken<SpaceValue>;
  height: DesignToken<SpaceValue>;
  backgroundColor: DesignToken<BackgroundColorValue>;
  top: DesignToken<SpaceValue>;
  left: DesignToken<SpaceValue>;
}

interface AuthenticatorRouterTokens {
  borderWidth: DesignToken<BorderWidthValue>;
  borderStyle: DesignToken<BorderStyleValue>;
  borderColor: DesignToken<BorderColorValue>;
  backgroundColor: DesignToken<BackgroundColorValue>;
  boxShadow: DesignToken<BoxShadowValue>;
}

interface AuthenticatorFooterTokens {
  paddingBottom: DesignToken<SpaceValue>;
}

interface AuthenticatorFormTokens {
  padding: DesignToken<SpaceValue>;
}

interface AuthenticatorStateTokens {
  inactive: {
    backgroundColor: DesignToken<BackgroundColorValue>;
  };
}

interface AuthenticatorOrContainerTokens {
  color: DesignToken<ColorValue>;
  orLine: {
    backgroundColor: DesignToken<BackgroundColorValue>;
  };
}

interface AuthenticatorContainerToken {
  widthMax: DesignToken<SpaceValue>;
}

export interface AuthenticatorTokens {
  maxWidth: DesignToken<SpaceValue>;
  modal: AuthenticatorModalTokens;
  container: AuthenticatorContainerToken;
  router: AuthenticatorRouterTokens;
  footer: AuthenticatorFooterTokens;
  form: AuthenticatorFormTokens;
  state: AuthenticatorStateTokens;
  orContainer: AuthenticatorOrContainerTokens;
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
