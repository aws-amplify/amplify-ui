// backticks intentional to display as `code` block
export const REACT_MESSAGE_STYLE_PROPS = [
  {
    name: `body?`,
    description: 'style applied to the message body',
    type: `React.CSSProperties`,
  },
  {
    name: `closeIconButton?`,
    description: 'style applied to the close button',
    type: `React.CSSProperties`,
  },
  {
    name: `container?`,
    description:
      'style applied to the primary container of the message component',
    type: `React.CSSProperties`,
  },
  {
    name: `header?`,
    description: 'style applied to the message header',
    type: `React.CSSProperties`,
  },
  {
    name: `image?`,
    description: 'style applied to the message image',
    type: `React.CSSProperties`,
  },
  {
    name: `primaryButton?`,
    description: 'style applied to the message primary button',
    type: `React.CSSProperties`,
  },
  {
    name: `secondaryButton?`,
    description: 'style applied to the message secondary button',
    type: `React.CSSProperties`,
  },
];

// backticks intentional to display as `code` block
export const REACT_NATIVE_MESSAGE_STYLE_PROPS = [
  {
    name: `body?`,
    description: 'style applied to the message body',
    type: `StyleProp<TextStyle>`,
  },
  {
    name: `closeIconButton?`,
    description: 'style applied to the close button',
    type: `StyleProp<ViewStyle>`,
  },
  {
    name: `closeIconColor?`,
    description: 'string color value applied to close icon',
    type: `ColorValue`,
  },
  {
    name: `container?`,
    description:
      'style applied to the primary container of the message component',
    type: `StyleProp<ViewStyle>`,
  },
  {
    name: `header?`,
    description: 'style applied to the message header',
    type: `StyleProp<TextStyle>`,
  },
  {
    name: `image?`,
    description: 'style applied to the message image',
    type: `StyleProp<ImageStyle>`,
  },
  {
    name: `pageIndicatorActive?`,
    description: 'style applied to an active page indicator (Carousel only)',
    type: `StyleProp<ViewStyle>`,
  },
  {
    name: `pageIndicatorInactive?`,
    description: 'style applied to an inactive page indicator (Carousel only)',
    type: `StyleProp<ViewStyle>`,
  },
  {
    name: `primaryButton?`,
    description: 'style applied to the message primary button',
    type: `MessageButtonStyleProps`,
  },
  {
    name: `secondaryButton?`,
    description: 'style applied to the message secondary button',
    type: `MessageButtonStyleProps`,
  },
];

// backticks intentional to display as `code` block
export const USE_IN_APP_MESSAGING_API = [
  {
    name: `clearMessage`,
    description:
      'Removes the current in-app message (if any) from context state',
    type: `() => void`,
  },
  {
    name: `displayMessage`,
    description: 'Render a local in-app message',
    type: `(message: Message) => void`,
  },
  {
    name: `message`,
    description: 'current in-app message (if any) loaded in context state',
    type: `Message | null`,
  },
];

// backticks intentional to display as `code` block
export const IN_APP_MESSAGE_DISPLAY_PROPS = [
  {
    name: `components?`,
    description: 'Message override UI components',
    type: `MessageComponents`,
  },
];

// backticks intentional to display as `code` block
export const MESSAGE_COMPONENTS = [
  {
    name: `BannerMessage?`,
    description: 'Banner UI component (top, middle, and bottom layouts)',
    type: `BannerMessageProps`,
  },
  {
    name: `CarouselMessage?`,
    description:
      'Carousel UI component (default provided for React Native only)',
    type: `CarouselMessageProps`,
  },
  {
    name: `FullScreenMessage?`,
    description: 'FullScreen UI component',
    type: `FullScreenMessageProps`,
  },
  {
    name: `ModalMessage?`,
    description: 'Modal UI component',
    type: `ModalMessageProps`,
  },
];
