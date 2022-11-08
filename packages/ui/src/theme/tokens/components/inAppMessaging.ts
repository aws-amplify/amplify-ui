import { DesignTokenProperties } from '../types/designToken';

interface BannerTokens extends DesignTokenProperties<'height' | 'width'> {}

interface ButtonTokens
  extends DesignTokenProperties<'backgroundColor' | 'borderRadius' | 'color'> {}

interface DialogTokens
  extends DesignTokenProperties<
    'height' | 'minHeight' | 'minWidth' | 'width'
  > {}

interface HeaderTokens
  extends DesignTokenProperties<'fontSize' | 'fontWeight'> {}

export interface InAppMessagingTokens {
  banner?: BannerTokens;
  button?: ButtonTokens;
  dialog?: DialogTokens;
  header?: HeaderTokens;
}

export const inappmessaging: InAppMessagingTokens = {
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
