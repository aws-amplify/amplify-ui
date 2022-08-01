import {
  DesignToken,
  FontSizeValue,
  FontWeightValue,
} from '../types/designToken';

interface HeaderTokens {
  fontSize: DesignToken<FontSizeValue>;
  fontWeight: DesignToken<FontWeightValue>;
}

export interface InAppMessagingTokens {
  header: HeaderTokens;
}

export const inappmessaging: InAppMessagingTokens = {
  header: {
    fontSize: { value: '{fontSizes.medium.value}' },
    fontWeight: { value: '{fontWeights.extrabold.value}' },
  },
};
