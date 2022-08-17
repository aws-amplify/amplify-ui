import {
  DesignToken,
  FontSizeValue,
  FontWeightValue,
  SpaceValue,
} from '../types/designToken';

interface BannerTokens {
  height: DesignToken<SpaceValue>;
  width: DesignToken<SpaceValue>;
}

interface DialogTokens {
  height: DesignToken<SpaceValue>;
  minHeight: DesignToken<SpaceValue>;
  minWidth: DesignToken<SpaceValue>;
  width: DesignToken<SpaceValue>;
}

interface HeaderTokens {
  fontSize: DesignToken<FontSizeValue>;
  fontWeight: DesignToken<FontWeightValue>;
}

export interface InAppMessagingTokens {
  banner: BannerTokens;
  dialog: DialogTokens;
  header: HeaderTokens;
}

export const inappmessaging: InAppMessagingTokens = {
  banner: {
    height: { value: '150px ' },
    width: { value: '400px ' },
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
