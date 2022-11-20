import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type ModalTokenKey = 'width' | 'height' | 'backgroundColor' | 'top' | 'left';

type AuthenticatorModalTokens<OutputType> = DesignTokenProperties<
  ModalTokenKey,
  OutputType
>;

type RouterKey =
  | 'borderWidth'
  | 'borderStyle'
  | 'borderColor'
  | 'backgroundColor'
  | 'boxShadow';

type AuthenticatorRouterTokens<OutputType> = DesignTokenProperties<
  RouterKey,
  OutputType
>;

type AuthenticatorFooterTokens<OutputType> = DesignTokenProperties<
  'paddingBottom',
  OutputType
>;

type AuthenticatorFormTokens<OutputType> = DesignTokenProperties<
  'padding',
  OutputType
>;

type AuthenticatorStateTokens<OutputType> = {
  inactive?: DesignTokenProperties<'backgroundColor', OutputType>;
};

type AuthenticatorOrContainerTokens<OutputType> = DesignTokenProperties<
  'color',
  OutputType
> & {
  orLine?: DesignTokenProperties<'backgroundColor', OutputType>;
};

type AuthenticatorContainerToken<OutputType> = {
  widthMax?: DesignTokenProperties<'maxWidth', OutputType>['maxWidth'];
};

export type AuthenticatorTokens<OutputType extends OutputVariantKey> =
  DesignTokenProperties<'maxWidth', OutputType> & {
    modal?: AuthenticatorModalTokens<OutputType>;
    container?: AuthenticatorContainerToken<OutputType>;
    router?: AuthenticatorRouterTokens<OutputType>;
    footer?: AuthenticatorFooterTokens<OutputType>;
    form?: AuthenticatorFormTokens<OutputType>;
    state?: AuthenticatorStateTokens<OutputType>;
    orContainer?: AuthenticatorOrContainerTokens<OutputType>;
  };

export const authenticator: Required<AuthenticatorTokens<'default'>> = {
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
