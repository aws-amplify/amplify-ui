export const CSSPrefix = 'amplify-ui';

export interface Theme {
  components: {
    badge: {
      lineHeight: number;
      fontWeight: number;
      fontSize: string;
      textAlign: string;
      padding: string[];
      backgroundColor: string;
      borderRadius: string;
      info: {
        backgroundColor: string;
      };
      warning: {
        backgroundColor: string;
      };
      success: {
        backgroundColor: string;
      };
      error: {
        backgroundColor: string;
      };
      small: {
        fontSize: string;
        padding: string[];
      };
      large: {
        fontSize: string;
        padding: string[];
      };
    };
    button: {
      fontWeight: string;
      textAlign: string;
      borderRadius: string;
      transitionDuration: string;
      fontSize: string;
      padding: string[];
      borderColor: string;
      borderWidth: string;
      borderStyle: string;
      color: string;
      _hover: {
        color: string;
        backgroundColor: string;
        borderColor: string;
      };
      _focus: {
        color: string;
        borderColor: string;
      };
      _active: {
        color: string;
        backgroundColor: string;
        borderColor: string;
      };
      _loading: {
        color: string;
        backgroundColor: string;
        borderColor: string;
      };
      _disabled: {
        color: string;
        backgroundColor: string;
        borderColor: string;
      };
      primary: {
        borderWidth: number;
        backgroundColor: string;
        color: string;
        _disabled: {
          backgroundColor: string;
          color: string;
        };
        _loading: {
          backgroundColor: string;
          color: string;
        };
        _hover: {
          backgroundColor: string;
        };
        _focus: {
          backgroundColor: string;
        };
        _active: {
          backgroundColor: string;
        };
      };
      link: {
        borderWidth: number;
        backgroundColor: string;
        color: string;
        _hover: {
          color: string;
        };
        _focus: {
          color: string;
        };
        _active: {
          color: string;
        };
        _disabled: {
          color: string;
        };
        _loading: {
          color: string;
        };
      };
      small: {
        fontSize: string;
        padding: string[];
        borderRadius: string;
      };
      large: {
        fontSize: string;
        padding: string[];
        borderRadius: string;
      };
    };
    card: {
      backgroundColor: string;
      borderWidth: string;
      borderStyle: string;
      borderColor: string;
      boxShadow: string;
      padding: string;
    };
    divider: {
      borderStyle: string;
      borderColor: string;
      borderWidth: string;
      small: {
        borderWidth: string;
      };
      large: {
        borderWidth: string;
      };
      opacity: string;
    };
    flex: {
      gap: string;
      justifyContent: string;
      alignItems: string;
      alignContent: string;
      flexWrap: string;
    };
    heading: {
      '1': {
        fontSize: string;
        fontWeight: number;
      };
      '2': {
        fontSize: string;
        fontWeight: number;
      };
      '3': {
        fontSize: string;
        fontWeight: number;
      };
      '4': {
        fontSize: string;
        fontWeight: number;
      };
      '5': {
        fontSize: string;
        fontWeight: number;
      };
      '6': {
        fontSize: string;
        fontWeight: number;
      };
      color: string;
      lineHeight: number;
    };
    icon: {
      lineHeight: number;
      height: string;
      large: {
        height: string;
      };
      small: {
        height: string;
      };
    };
    image: {
      maxWidth: string;
      height: string;
      objectFit: string;
      objectPosition: string;
    };
    pagination: {
      current: {
        color: string;
        fontSize: string;
        backgroundColor: string;
      };
      button: {
        color: string;
        fontWeight: string;
        paddingTop: string;
        paddingRight: string;
        paddingBottom: string;
        paddingLeft: string;
        transition: string;
        hover: {
          backgroundColor: string;
        };
        disabled: {
          opacity: string;
        };
      };
      ellipsis: {
        paddingRight: string;
        paddingLeft: string;
      };
      itemContainer: {
        marginLeft: string;
        marginRight: string;
      };
      itemShared: {
        height: string;
        minWidth: string;
        borderRadius: string;
      };
    };
    placeholder: {
      borderRadius: string;
      transitionDuration: string;
      startColor: string;
      endColor: string;
      small: {
        height: string;
      };
      default: {
        height: string;
      };
      large: {
        height: string;
      };
    };
    rating: {
      large: {
        size: string;
      };
      default: {
        size: string;
      };
      small: {
        size: string;
      };
      filled: {
        color: string;
      };
      empty: {
        color: string;
      };
    };
    text: {
      color: string;
      primary: {
        color: string;
      };
      secondary: {
        color: string;
      };
      tertiary: {
        color: string;
      };
      error: {
        color: string;
      };
      warning: {
        color: string;
      };
      success: {
        color: string;
      };
      info: {
        color: string;
      };
    };
  };
  borderWidths: {
    small: string;
    medium: string;
    large: string;
  };
  colors: {
    red: {
      '10': string;
      '20': string;
      '40': string;
      '60': string;
      '80': string;
      '90': string;
      '100': string;
    };
    orange: {
      '10': string;
      '20': string;
      '40': string;
      '60': string;
      '80': string;
      '90': string;
      '100': string;
    };
    yellow: {
      '10': string;
      '20': string;
      '40': string;
      '60': string;
      '80': string;
      '90': string;
      '100': string;
    };
    green: {
      '10': string;
      '20': string;
      '40': string;
      '60': string;
      '80': string;
      '90': string;
      '100': string;
    };
    teal: {
      '10': string;
      '20': string;
      '40': string;
      '60': string;
      '80': string;
      '90': string;
      '100': string;
    };
    blue: {
      '10': string;
      '20': string;
      '40': string;
      '60': string;
      '80': string;
      '90': string;
      '100': string;
    };
    purple: {
      '10': string;
      '20': string;
      '40': string;
      '60': string;
      '80': string;
      '90': string;
      '100': string;
    };
    pink: {
      '10': string;
      '20': string;
      '40': string;
      '60': string;
      '80': string;
      '90': string;
      '100': string;
    };
    neutral: {
      '10': string;
      '20': string;
      '40': string;
      '60': string;
      '80': string;
      '90': string;
      '100': string;
    };
    brand: {
      primary: {
        '10': string;
        '20': string;
        '40': string;
        '60': string;
        '80': string;
        '90': string;
        '100': string;
      };
      secondary: {
        '10': string;
        '20': string;
        '40': string;
        '60': string;
        '80': string;
        '90': string;
        '100': string;
      };
    };
    font: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
      interactive: string;
      hover: string;
      focus: string;
      active: string;
      info: string;
      warning: string;
      error: string;
      success: string;
    };
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      info: string;
      warning: string;
      error: string;
      success: string;
    };
    border: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    shadow: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    black: string;
    white: string;
    transparent: string;
    icon: {
      filled: string;
      empty: string;
    };
  };
  fonts: {
    default: {
      variable: string;
      static: string;
    };
  };
  fontSizes: {
    xs: string;
    small: string;
    medium: string;
    large: string;
    xl: string;
    xxl: string;
    xxxl: string;
    xxxxl: string;
  };
  fontWeights: {
    hairline: number;
    thin: number;
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
    black: number;
  };
  lineHeights: {};
  opacities: {
    '0': string;
    '10': string;
    '20': string;
    '30': string;
    '40': string;
    '50': string;
    '60': string;
    '70': string;
    '80': string;
    '90': string;
    '100': string;
  };
  radii: {
    small: string;
    medium: string;
    large: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
  space: {
    xxs: string;
    xs: string;
    small: string;
    medium: string;
    large: string;
    xl: string;
    xxl: string;
    xxxl: string;
  };
  time: {
    transition: {
      short: string;
      medium: string;
      long: string;
    };
  };
}
