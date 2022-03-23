import {
  DesignToken,
  ColorValue,
  SpaceValue,
  BorderWidthValue,
  BorderColorValue,
  BackgroundColorValue,
  BorderStyleValue,
  BoxShadowRefValue,
} from '../types/designToken';

interface ModalStyle {
  width: DesignToken<SpaceValue>;
  height: DesignToken<SpaceValue>;
  backgroundColor: DesignToken<ColorValue>;
  top: DesignToken<SpaceValue>;
  left: DesignToken<SpaceValue>;
}

interface RouterStyle {
  borderWidth: DesignToken<BorderWidthValue>; //
  borderStyle: DesignToken<BorderStyleValue>; //
  borderColor: DesignToken<BorderColorValue>;
  backgroundColor: DesignToken<BackgroundColorValue>;
  boxShadow: DesignToken<BoxShadowRefValue>; //@TODO is this right, will it mess things up in figma?
}

interface FooterStyle {
  paddingBottom: DesignToken<SpaceValue>;
}

interface FormStyle {
  padding: DesignToken<SpaceValue>;
}

interface StateStyle {
  inactive: {
    backgroundColor: DesignToken<BackgroundColorValue>;
  };
}

interface OrContainerStyle {
  color: unknown;
  orLine: {
    backgroundColor: DesignToken<BackgroundColorValue>;
  };
}
export interface AuthenticatorTokens {
  maxWidth: DesignToken<SpaceValue>;
  modal: ModalStyle;
  container: {
    widthMax: DesignToken<SpaceValue>;
  };
  router: RouterStyle;
  footer: FooterStyle;
  form: FormStyle;
  state: StateStyle;
  orContainer: OrContainerStyle;
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
