import { defineComponentTheme } from '@aws-amplify/ui-react/server';

export const headerTheme = defineComponentTheme({
  name: 'app-header',
  theme: (tokens) => {
    return {
      display: 'flex',
      flexDirection: 'row',
      paddingInline: tokens.space.large,
      paddingBlock: tokens.space.small,
      borderWidth: 0,
      borderBottomWidth: tokens.borderWidths.small,
      borderStyle: 'solid',
      borderColor: tokens.colors.border.primary,
      zIndex: 99,
    };
  },
});

export const Header = ({ children }: React.PropsWithChildren) => {
  return <div className={headerTheme.className()}>{children}</div>;
};
