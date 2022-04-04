export const authenticator = {
  maxWidth: { value: '60rem' },
  modal: {
    width: { value: '{space.relative.full}' },
    height: { value: '{space.relative.full}' },
    backgroundColor: { value: '{colors.overlay.50.value}' },
    top: { value: '{space.zero}' },
    left: { value: '{space.zero}' },
  },
  container: {
    widthMax: { value: '30rem' },
  },
  fieldset: {
    flexDirection: { value: 'column' },
  },
  router: {
    borderWidth: { value: '{borderWidths.small.value}' },
    borderStyle: { value: 'solid' },
    borderColor: { value: '{colors.border.primary.value}' },
    backgroundColor: { value: '{colors.background.primary.value}' },
    boxShadow: { value: '{shadows.medium.value}' },
  },
  footer: {
    paddingBottom: { value: '{space.medium.value}' },
  },
  form: {
    padding: { value: '{space.xl.value}' },
  },
  state: {
    inactive: {
      backgroundColor: { value: '{colors.background.secondary.value}' },
    },
  },
  orContainer: {
    color: { value: '{colors.neutral.80.value}' },
    orLine: {
      backgroundColor: { value: '{colors.background.primary.value}' },
    },
  },
  signIn: {
    button: {
      fontWeight: { value: '{components.button.fontWeight.value}' },
      borderColor: { value: '{components.button.primary.borderColor.value}' },
      background: {
        value: '{components.button.primary.backgroundColor.value}',
      },
    },
  },
};
