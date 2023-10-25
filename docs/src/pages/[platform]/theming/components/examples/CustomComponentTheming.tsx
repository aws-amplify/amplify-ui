import { createTheme, Theme } from '@aws-amplify/ui-react/theme';
import { Avatar } from './Avatar';

const theme = createTheme({
  name: 'custom-theme',
  components: {
    avatar: Avatar.theme,
  },
});

export default function CustomComponentTheming() {
  return (
    <Theme theme={theme}>
      <Avatar variation="filled" />
      <Avatar variation="outlined" />
    </Theme>
  );
}
