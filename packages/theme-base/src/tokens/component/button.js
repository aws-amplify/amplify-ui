module.exports = {
  components: {
    button: {
      // shared styles
      fontWeight: { value: "bold" },
      textAlign: { value: "center" },
      borderRadius: { value: "{radii.medium.value}" },
      transitionDuration: { value: "{time.transition.medium.value}" },
      
      // variations
      primary: {
        backgroundColor: { value: "{colors.brand.primary.80.value}" },
        color: { value: "{colors.font.inverse.value}" },
        _disabled: {
          backgroundColor: { value: "{colors.background.tertiary.value}" },
          color: { value: "{colors.font.tertiary.value}" }
        },
        _loading: {
          backgroundColor: { value: "{colors.background.tertiary.value}" },
          color: { value: "{colors.font.tertiary.value}" }
        },
        _hover: {
          backgroundColor: { value: "{colors.brand.primary.90.value}" }
        },
        _focus: {
          backgroundColor: { value: "{colors.brand.primary.90.value}" }
        },
        _active: {
          backgroundColor: { value: "{colors.brand.primary.100.value}" }
        }
      },
      
      default: {
        borderColor: { value: "{colors.brand.primary.20.value}" },
        borderWidth: { value: "{borderWidths.small.value}" },
        borderStyle: { value: "solid" },
        color: { value: "{colors.brand.primary.80.value}" },
        _hover: {
          color: { value: "{colors.brand.primary.90.value}" },
          backgroundColor: { value: "{colors.brand.primary.10.value}" },
          borderColor: { value: "{colors.brand.primary.60.value}" }
        },
        _focus: {
          color: { value: "{colors.brand.primary.90.value}" },
          borderColor: { value: "{colors.brand.primary.90.value}" }
        },
        _active: {
          color: { value: "{colors.font.inverse.value}" },
          backgroundColor: { value: "{colors.brand.primary.100.value}" },
          borderColor: { value: "{colors.brand.primary.100.value}" }
        },
        _loading: {
          color: { value: "{colors.font.tertiary.value}" },
          backgroundColor: { value: "transparent" },
          borderColor: { value: "{colors.border.tertiary.value}" }
        },
        _disabled: {
          color: { value: "{colors.font.tertiary.value}" },
          backgroundColor: { value: "transparent" },
          borderColor: { value: "{colors.border.tertiary.value}" }
        }
      },
      
      link: {
        color: { value: "{colors.font.interactive.value}" },
        _hover: {
          color: { value: "{colors.font.hover.value}" }
        },
        _focus: {
          color: { value: "{colors.font.focus.value}" }
        },
        _active: {
          color: { value: "{colors.font.active.value}" }
        },
        _disabled: {
          color: { value: "{colors.font.tertiary.value}" }
        },
        _loading: {
          color: { value: "{colors.font.tertiary.value}" }
        }
      },
      
      // sizes
      small: {
        fontSize: { value: "{fontSizes.small.value}" },
        padding: { value: ["{space.xs.value}", "{space.small.value}"] },
        borderRadius: { value: "{radii.medium.value}" }
      },
      medium: {
        fontSize: { value: "{fontSizes.medium.value}" },
        padding: { value: ["{space.small.value}", "{space.medium.value}"] },
        borderRadius: { value: "{radii.medium.value}" }
      },
      large: {
        fontSize: { value: "{fontSizes.large.value}" },
        padding: { value: ["{space.medium.value}", "{space.large.value}"] },
        borderRadius: { value: "{radii.medium.value}" }
      }
    }
  }
}