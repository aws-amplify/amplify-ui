import {
  BackgroundColorValue,
  BoxShadowValue,
  DesignToken,
  SpaceValue,
} from '../../types/designToken';

interface BannerButtonTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  width: DesignToken<SpaceValue>;
}

interface BannerButtonsContainerTokens {
  marginTop: DesignToken<SpaceValue>;
}

interface BannerContainerTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  boxShadow: DesignToken<BoxShadowValue>;
  margin: DesignToken<SpaceValue>;
  padding: DesignToken<SpaceValue>;
}

interface BannerImageContainerTokens {
  padding: DesignToken<SpaceValue>;
}

export interface BannerMessageTokens {
  button: BannerButtonTokens;
  buttonsContainer: BannerButtonsContainerTokens;
  bannerContainer: BannerContainerTokens;
  imageContainer: BannerImageContainerTokens;
}

export const bannermessage: BannerMessageTokens = {
  button: {
    backgroundColor: { value: '{colors.background.tertiary}' },
    width: { value: '{space.relative.full}' },
  },
  buttonsContainer: {
    marginTop: { value: '{space.xs}' },
  },
  bannerContainer: {
    backgroundColor: { value: '{colors.background.primary}' },
    boxShadow: { value: '{shadows.medium}' },
    margin: { value: '{space.medium}' },
    padding: { value: '{space.small}' },
  },
  imageContainer: {
    padding: { value: '{space.xs}' },
  },
};
