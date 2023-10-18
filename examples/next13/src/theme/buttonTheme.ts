import { ButtonTheme, createComponentTheme } from '@aws-amplify/ui';

const buttonTheme = createComponentTheme<ButtonTheme>({
  theme: (theme) => {
    return {
      _hover: {
        background: 'red',
      },
      modifier: {
        primary: {
          _hover: {
            background: 'red',
          },
          _disabled: {
            background: 'blue',
            backgroundImage: 'none',
          },
          backgroundImage: `linear-gradient(${theme.colors.brand.primary[60]},${theme.colors.brand.primary[80]})`,
        },
      },
    };
  },
});

export default buttonTheme;
