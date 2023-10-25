import { Icon, View } from '@aws-amplify/ui-react';
import { createComponentTheme } from '@aws-amplify/ui-react/theme';

const { theme, className } = createComponentTheme({
  name: 'avatar', // name is important here, it is used to create classnames
  theme(tokens) {
    return {
      padding: tokens.space.small,
      display: 'inline-flex',
      borderRadius: '100%',
      modifier: {
        filled: {
          backgroundColor: tokens.colors.brand.primary[60],
          color: tokens.colors.font.inverse,
        },
        outlined: {
          borderColor: tokens.colors.brand.primary[60],
          borderWidth: '1px',
          borderStyle: 'solid',
        },
      },
      element: {
        icon: {},
      },
    };
  },
});

export const Avatar = ({ variation, ...rest }) => {
  return (
    <View {...rest} className={className({ modifier: [variation] })}>
      <Icon
        className={className({ element: ['icon'] })}
        pathData="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"
      />
    </View>
  );
};

// You can export the component theme however you want
// you will need to use it when you call createTheme
Avatar.theme = theme;
