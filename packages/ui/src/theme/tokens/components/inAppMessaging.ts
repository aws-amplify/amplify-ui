import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type BannerTokens<Output> = DesignTokenProperties<'height' | 'width', Output>;

type ButtonTokens<Output> = DesignTokenProperties<
  'backgroundColor' | 'borderRadius' | 'color',
  Output
>;

type DialogTokens<Output> = DesignTokenProperties<
  'height' | 'minHeight' | 'minWidth' | 'width',
  Output
>;

type HeaderTokens<Output> = DesignTokenProperties<
  'fontSize' | 'fontWeight',
  Output
>;

export type InAppMessagingTokens<Output extends OutputVariantKey> = {
  banner?: BannerTokens<Output>;
  button?: ButtonTokens<Output>;
  dialog?: DialogTokens<Output>;
  header?: HeaderTokens<Output>;
};

export const inappmessaging: Required<InAppMessagingTokens<'default'>> = {
  banner: {
    height: { value: '150px ' },
    width: { value: '400px ' },
  },
  button: {
    backgroundColor: { value: '#e8e8e8' },
    borderRadius: { value: '5px' },
    color: { value: 'black' },
  },
  dialog: {
    height: { value: '50vh' },
    minHeight: { value: '400px' },
    minWidth: { value: '400px' },
    width: { value: '30vw' },
  },
  header: {
    fontSize: { value: '{fontSizes.medium.value}' },
    fontWeight: { value: '{fontWeights.extrabold.value}' },
  },
};
