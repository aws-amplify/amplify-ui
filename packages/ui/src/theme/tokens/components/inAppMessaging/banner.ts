import {
  BackgroundColorValue,
  BoxShadowValue,
  BorderStyleValue,
  DesignToken,
  FlexDirectionValue,
  FlexValue,
  JustifyContentValue,
  ObjectFitValue,
  PositionValue,
  SpaceValue,
  TransformValue,
} from '../../types/designToken';

interface BannerButtonTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  borderStyle: DesignToken<BorderStyleValue>;
  width: DesignToken<SpaceValue>;
}

interface BannerButtonsContainerTokens {
  marginTop: DesignToken<SpaceValue>;
}

interface BannerContainerTokens {
  backgroundColor: DesignToken<BackgroundColorValue>;
  boxShadow: DesignToken<BoxShadowValue>;
  flexDirection: DesignToken<FlexDirectionValue>;
  margin: DesignToken<SpaceValue>;
  padding: DesignToken<SpaceValue>;
  position: DesignToken<PositionValue>;
  right: DesignToken<SpaceValue>;
  rowGap: DesignToken<SpaceValue>;
}

interface BannerContentContainerTokens {
  flexDirection: DesignToken<FlexDirectionValue>;
}

interface BannerImageTokens {
  objectFit: DesignToken<ObjectFitValue>;
}

interface BannerImageContainerTokens {
  justifyContent: DesignToken<JustifyContentValue>;
  maxWidth: DesignToken<SpaceValue>;
  minWidth: DesignToken<SpaceValue>;
  padding: DesignToken<SpaceValue>;
  width: DesignToken<SpaceValue>;
}

interface BannerPositionTokens {
  bottom: DesignToken<SpaceValue>;
  top: DesignToken<SpaceValue>;
  transform: DesignToken<TransformValue>;
}

interface BannerTextContainerTokens {
  flex: DesignToken<FlexValue>;
  flexDirection: DesignToken<FlexDirectionValue>;
  gap: DesignToken<SpaceValue>;
  justifyContent: DesignToken<JustifyContentValue>;
}

export interface InAppMessagingBannerTokens {
  button: BannerButtonTokens;
  buttonsContainer: BannerButtonsContainerTokens;
  bannerContainer: BannerContainerTokens;
  contentContainer: BannerContentContainerTokens;
  image: BannerImageTokens;
  imageContainer: BannerImageContainerTokens;
  textContainer: BannerTextContainerTokens;
  topBanner: BannerPositionTokens;
  middleBanner: BannerPositionTokens;
  bottomBanner: BannerPositionTokens;
}

export const inappmessagingbanner: InAppMessagingBannerTokens = {
  button: {
    backgroundColor: { value: '{colors.background.tertiary}' },
    borderStyle: { value: 'none' },
    width: { value: '100%' },
  },
  buttonsContainer: {
    marginTop: { value: '6px' },
  },
  bannerContainer: {
    backgroundColor: { value: '{colors.background.primary}' },
    boxShadow: { value: '2px 2px 9px 3px rgb(0, 0, 0, 0.1)' },
    flexDirection: { value: 'column' },
    margin: { value: '{space.medium}' },
    padding: { value: '{space.small}' },
    position: { value: 'fixed' },
    right: { value: '0' },
    rowGap: { value: '0' },
  },
  contentContainer: {
    flexDirection: { value: 'row' },
  },
  image: {
    objectFit: { value: 'contain' },
  },
  imageContainer: {
    justifyContent: { value: 'center' },
    minWidth: { value: '75px' },
    maxWidth: { value: '100px' },
    padding: { value: '5px' },
    width: { value: '15%' },
  },
  textContainer: {
    flex: { value: '1' },
    flexDirection: { value: 'column' },
    gap: { value: 'initial' },
    justifyContent: { value: 'center' },
  },
  topBanner: {
    bottom: { value: 'initial' },
    top: { value: '0' },
    transform: { value: 'translateY(0%)' },
  },
  middleBanner: {
    bottom: { value: 'initial' },
    top: { value: '50%' },
    transform: { value: 'translateY(calc(-50% - 16px))' },
  },
  bottomBanner: {
    bottom: { value: '0' },
    top: { value: 'initial' },
    transform: { value: 'translateY(0%)' },
  },
};
