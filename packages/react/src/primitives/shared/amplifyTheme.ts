
/**
 * Defines a default Amplify SystemUI Theme
 * 
 * For all Chakra design tokens see:
 * https://github.com/chakra-ui/chakra-ui/tree/main/packages/theme/src/components
 */

// Button component ref: https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/button.ts
const Button = {
  baseStyle: {
    borderRadius: "var(--amplify-ui-border-radius-md)",
    color: "var(--amplify-ui-button-color-black-primary)",
    paddingInlineStart: "var(--amplify-ui-button-padding)",
    paddingInlineEnd: "var(--amplify-ui-button-padding)",
    fontWeight: "var(--amplify-ui-button-font-weight)",
    _disabled: {
      opacity: "var(--amplify-ui-button-disabled-opacity)",
      cursor: "var(--amplify-ui-button-disabled-cursor)"
    }
  },
  sizes: {
    large: { // supports the emotion version of primitive
      height: "var(--amplify-ui-button-height-large)",
      fontSize: "var(--amplify-ui-button-font-size-large)"
    },
    medium: { // supports the emotion version of primitive
      height: "var(--amplify-ui-button-height-medium)",
      fontSize: "var(--amplify-ui-button-font-size-medium)"
    },
    small: { // supports the emotion version of primitive
      height: "var(--amplify-ui-button-height-small)",
      fontSize: "var(--amplify-ui-button-font-size-small)"
    },
    lg: { // chakra doesn't support long versions of sizes
      height: "var(--amplify-ui-button-height-large)",
      fontSize: "var(--amplify-ui-button-font-size-large)"
    },
    md: { // chakra doesn't support long versions of sizes
      height: "var(--amplify-ui-button-height-medium)",
      fontSize: "var(--amplify-ui-button-font-size-medium)"
    },
    sm: { // chakra doesn't support long versions of sizes
      height: "var(--amplify-ui-button-height-small)",
      fontSize: "var(--amplify-ui-button-font-size-small)"
    }
  },
  variants: {
    primary: {
      backgroundColor: "var(--amplify-ui-button-color-bg-primary)",
      color: "var(--amplify-ui-button-color-text-primary)",
      _hover: {
        backgroundColor: "var(--amplify-ui-button-color-bg-primary-hover)",
        borderColor: "var(--amplify-ui-button-color-border-primary)",
        _disabled: {
          backgroundColor: "var(--amplify-ui-button-color-bg-primary)",
          color: "var(--amplify-ui-button-color-text-primary)",
        }
      },
    },
    secondary: {
      border: "1px solid var(--amplify-ui-button-color-border-secondary)",
      color: "var(--amplify-ui-button-color-text-secondary)",
      _hover: {
        borderColor: "var(--amplify-ui-button-color-border-secondary)",
        backgroundColor: "var(--amplify-ui-button-color-bg-secondary-hover)",
      },
    },
    tertiary: {
      backgroundColor: "var(--amplify-ui-button-color-bg-tertiary)",
      color: "var(--amplify-ui-button-color-text-tertiary)",
      _hover: {
        backgroundColor: "var(--amplify-ui-button-color-bg-tertiary-hover)",
      },
      _disabled: {
        backgroundColor: "var(--amplify-ui-button-color-bg-tertiary-hover)",
      }
    },
    link: {
      color: "var(--amplify-ui-button-color-text-link)",
      _hover: {
        textDecoration: "underline",
      }
    },
  },
  states: { // This is only for demo'ing the ButtoneElementEmotion component
    loading: {
      opacity: 0.8
    }
  },
  defaultProps: {
    variant: "secondary",
    size: "md"
  }
}

export const amplifyTheme = {
  "direction": "ltr",
  "breakpoints": {
    "base": "0em",
    "sm": "30em",
    "md": "48em",
    "lg": "62em",
    "xl": "80em",
    "2xl": "96em"
  },
  "zIndices": {
    "hide": -1,
    "auto": "auto",
    "base": 0,
    "docked": 10,
    "dropdown": 1000,
    "sticky": 1100,
    "banner": 1200,
    "overlay": 1300,
    "modal": 1400,
    "popover": 1500,
    "skipLink": 1600,
    "toast": 1700,
    "tooltip": 1800
  },
  "radii": {
    "none": "0",
    "sm": "0.125rem",
    "base": "0.25rem",
    "md": "0.375rem",
    "lg": "0.5rem",
    "xl": "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    "full": "9999px"
  },
  "blur": {
    "none": 0,
    "sm": "4px",
    "base": "8px",
    "md": "12px",
    "lg": "16px",
    "xl": "24px",
    "2xl": "40px",
    "3xl": "64px"
  },
  "colors": {
    "transparent": "transparent",
    "current": "currentColor",
    "black": "#000000",
    "white": "#FFFFFF",
    "whiteAlpha": {
      "50": "rgba(255, 255, 255, 0.04)",
      "100": "rgba(255, 255, 255, 0.06)",
      "200": "rgba(255, 255, 255, 0.08)",
      "300": "rgba(255, 255, 255, 0.16)",
      "400": "rgba(255, 255, 255, 0.24)",
      "500": "rgba(255, 255, 255, 0.36)",
      "600": "rgba(255, 255, 255, 0.48)",
      "700": "rgba(255, 255, 255, 0.64)",
      "800": "rgba(255, 255, 255, 0.80)",
      "900": "rgba(255, 255, 255, 0.92)"
    },
    "blackAlpha": {
      "50": "rgba(0, 0, 0, 0.04)",
      "100": "rgba(0, 0, 0, 0.06)",
      "200": "rgba(0, 0, 0, 0.08)",
      "300": "rgba(0, 0, 0, 0.16)",
      "400": "rgba(0, 0, 0, 0.24)",
      "500": "rgba(0, 0, 0, 0.36)",
      "600": "rgba(0, 0, 0, 0.48)",
      "700": "rgba(0, 0, 0, 0.64)",
      "800": "rgba(0, 0, 0, 0.80)",
      "900": "rgba(0, 0, 0, 0.92)"
    },
    "gray": {
      "50": "#F7FAFC",
      "100": "#EDF2F7",
      "200": "#E2E8F0",
      "300": "#CBD5E0",
      "400": "#A0AEC0",
      "500": "#718096",
      "600": "#4A5568",
      "700": "#2D3748",
      "800": "#1A202C",
      "900": "#171923"
    },
    "red": {
      "50": "#FFF5F5",
      "100": "#FED7D7",
      "200": "#FEB2B2",
      "300": "#FC8181",
      "400": "#F56565",
      "500": "#E53E3E",
      "600": "#C53030",
      "700": "#9B2C2C",
      "800": "#822727",
      "900": "#63171B"
    },
    "orange": {
      "50": "#FFFAF0",
      "100": "#FEEBC8",
      "200": "#FBD38D",
      "300": "#F6AD55",
      "400": "#ED8936",
      "500": "#DD6B20",
      "600": "#C05621",
      "700": "#9C4221",
      "800": "#7B341E",
      "900": "#652B19"
    },
    "yellow": {
      "50": "#FFFFF0",
      "100": "#FEFCBF",
      "200": "#FAF089",
      "300": "#F6E05E",
      "400": "#ECC94B",
      "500": "#D69E2E",
      "600": "#B7791F",
      "700": "#975A16",
      "800": "#744210",
      "900": "#5F370E"
    },
    "green": {
      "50": "#F0FFF4",
      "100": "#C6F6D5",
      "200": "#9AE6B4",
      "300": "#68D391",
      "400": "#48BB78",
      "500": "#38A169",
      "600": "#2F855A",
      "700": "#276749",
      "800": "#22543D",
      "900": "#1C4532"
    },
    "teal": {
      "50": "#E6FFFA",
      "100": "#B2F5EA",
      "200": "#81E6D9",
      "300": "#4FD1C5",
      "400": "#38B2AC",
      "500": "#319795",
      "600": "#2C7A7B",
      "700": "#285E61",
      "800": "#234E52",
      "900": "#1D4044"
    },
    "blue": {
      "50": "#ebf8ff",
      "100": "#bee3f8",
      "200": "#90cdf4",
      "300": "#63b3ed",
      "400": "#4299e1",
      "500": "#3182ce",
      "600": "#2b6cb0",
      "700": "#2c5282",
      "800": "#2a4365",
      "900": "#1A365D"
    },
    "cyan": {
      "50": "#EDFDFD",
      "100": "#C4F1F9",
      "200": "#9DECF9",
      "300": "#76E4F7",
      "400": "#0BC5EA",
      "500": "#00B5D8",
      "600": "#00A3C4",
      "700": "#0987A0",
      "800": "#086F83",
      "900": "#065666"
    },
    "purple": {
      "50": "#FAF5FF",
      "100": "#E9D8FD",
      "200": "#D6BCFA",
      "300": "#B794F4",
      "400": "#9F7AEA",
      "500": "#805AD5",
      "600": "#6B46C1",
      "700": "#553C9A",
      "800": "#44337A",
      "900": "#322659"
    },
    "pink": {
      "50": "#FFF5F7",
      "100": "#FED7E2",
      "200": "#FBB6CE",
      "300": "#F687B3",
      "400": "#ED64A6",
      "500": "#D53F8C",
      "600": "#B83280",
      "700": "#97266D",
      "800": "#702459",
      "900": "#521B41"
    },
    "linkedin": {
      "50": "#E8F4F9",
      "100": "#CFEDFB",
      "200": "#9BDAF3",
      "300": "#68C7EC",
      "400": "#34B3E4",
      "500": "#00A0DC",
      "600": "#008CC9",
      "700": "#0077B5",
      "800": "#005E93",
      "900": "#004471"
    },
    "facebook": {
      "50": "#E8F4F9",
      "100": "#D9DEE9",
      "200": "#B7C2DA",
      "300": "#6482C0",
      "400": "#4267B2",
      "500": "#385898",
      "600": "#314E89",
      "700": "#29487D",
      "800": "#223B67",
      "900": "#1E355B"
    },
    "messenger": {
      "50": "#D0E6FF",
      "100": "#B9DAFF",
      "200": "#A2CDFF",
      "300": "#7AB8FF",
      "400": "#2E90FF",
      "500": "#0078FF",
      "600": "#0063D1",
      "700": "#0052AC",
      "800": "#003C7E",
      "900": "#002C5C"
    },
    "whatsapp": {
      "50": "#dffeec",
      "100": "#b9f5d0",
      "200": "#90edb3",
      "300": "#65e495",
      "400": "#3cdd78",
      "500": "#22c35e",
      "600": "#179848",
      "700": "#0c6c33",
      "800": "#01421c",
      "900": "#001803"
    },
    "twitter": {
      "50": "#E5F4FD",
      "100": "#C8E9FB",
      "200": "#A8DCFA",
      "300": "#83CDF7",
      "400": "#57BBF5",
      "500": "#1DA1F2",
      "600": "#1A94DA",
      "700": "#1681BF",
      "800": "#136B9E",
      "900": "#0D4D71"
    },
    "telegram": {
      "50": "#E3F2F9",
      "100": "#C5E4F3",
      "200": "#A2D4EC",
      "300": "#7AC1E4",
      "400": "#47A9DA",
      "500": "#0088CC",
      "600": "#007AB8",
      "700": "#006BA1",
      "800": "#005885",
      "900": "#003F5E"
    }
  },
  "letterSpacings": {
    "tighter": "-0.05em",
    "tight": "-0.025em",
    "normal": "0",
    "wide": "0.025em",
    "wider": "0.05em",
    "widest": "0.1em"
  },
  "lineHeights": {
    "3": ".75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
    "normal": "normal",
    "none": 1,
    "shorter": 1.25,
    "short": 1.375,
    "base": 1.5,
    "tall": 1.625,
    "taller": "2"
  },
  "fontWeights": {
    "hairline": 100,
    "thin": 200,
    "light": 300,
    "normal": 400,
    "medium": 500,
    "semibold": 600,
    "bold": 700,
    "extrabold": 800,
    "black": 900
  },
  "fonts": {
    "heading": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
    "body": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"",
    "mono": "SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace"
  },
  "fontSizes": {
    "xs": "0.75rem",
    "sm": "0.875rem",
    "md": "1rem",
    "lg": "1.125rem",
    "xl": "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem"
  },
  "sizes": {
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
    "12": "3rem",
    "14": "3.5rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "28": "7rem",
    "32": "8rem",
    "36": "9rem",
    "40": "10rem",
    "44": "11rem",
    "48": "12rem",
    "52": "13rem",
    "56": "14rem",
    "60": "15rem",
    "64": "16rem",
    "72": "18rem",
    "80": "20rem",
    "96": "24rem",
    "px": "1px",
    "0.5": "0.125rem",
    "1.5": "0.375rem",
    "2.5": "0.625rem",
    "3.5": "0.875rem",
    "max": "max-content",
    "min": "min-content",
    "full": "100%",
    "3xs": "14rem",
    "2xs": "16rem",
    "xs": "20rem",
    "sm": "24rem",
    "md": "28rem",
    "lg": "32rem",
    "xl": "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
    "7xl": "80rem",
    "8xl": "90rem",
    "container": {
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px"
    }
  },
  components: {
    Button
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
    cssVarPrefix: "amplify-ui"
  }
};
