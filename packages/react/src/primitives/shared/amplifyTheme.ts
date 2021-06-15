
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
    lg: {
      height: "var(--amplify-ui-button-height-large)",
      fontSize: "var(--amplify-ui-button-font-size-large)"
    },
    md: {
      height: "var(--amplify-ui-button-height-medium)",
      fontSize: "var(--amplify-ui-button-font-size-medium)"
    },
    sm: {
      height: "var(--amplify-ui-button-height-small)",
      fontSize: "var(--amplify-ui-button-font-size-small)"
    }
  },
  variants: {
    primary: {
      bg: "var(--amplify-ui-button-color-bg-primary)",
      color: "var(--amplify-ui-button-color-text-primary)",
      _hover: {
        bg: "var(--amplify-ui-button-color-bg-primary-hover)",
        borderColor: "var(--amplify-ui-button-color-border-primary)",
        _disabled: {
          bg: "var(--amplify-ui-button-color-bg-primary)",
          color: "var(--amplify-ui-button-color-text-primary)",
        }
      },
    },
    secondary: {
      border: "1px solid var(--amplify-ui-button-color-border-secondary)",
      color: "var(--amplify-ui-button-color-text-secondary)",
      _hover: {
        borderColor: "var(--amplify-ui-button-color-border-secondary)",
        bg: "var(--amplify-ui-button-color-bg-secondary-hover)",
      },
    },
    tertiary: {
      bg: "var(--amplify-ui-button-color-bg-tertiary)",
      color: "var(--amplify-ui-button-color-text-tertiary)",
      _hover: {
        bg: "var(--amplify-ui-button-color-bg-tertiary-hover)",
      },
      _disabled: {
        bg: "var(--amplify-ui-button-color-bg-tertiary-hover)",
      }
    },
    link: {
      color: "var(--amplify-ui-button-color-text-link)",
      _hover: {
        textDecoration: "underline",
      }
    },
  },
  defaultProps: {
    variant: "secondary",
    size: "md"
  }
}

export const amplifyTheme = {
  components: {
    Button
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
    cssVarPrefix: "amplify-theme"
  }
};
