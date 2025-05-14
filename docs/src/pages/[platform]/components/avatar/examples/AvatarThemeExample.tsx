import { Avatar, ThemeProvider, createTheme } from '@aws-amplify/ui-react';

const theme = createTheme({
  name: 'avatar-theme',
  tokens: {
    components: {
      avatar: {
        borderRadius: '6px',
        borderWidth: '4px',
      },
    },
  },
});

export default function AvatarThemeExample() {
  return (
    <ThemeProvider theme={theme}>
      <Avatar />
      <Avatar variation="filled" />
      <Avatar variation="outlined" />
    </ThemeProvider>
  );
}
