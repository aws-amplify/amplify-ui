import { Breadcrumbs } from '@aws-amplify/ui-react';
import { Theme, createTheme } from '@aws-amplify/ui-react/theme';

const theme = createTheme({
  name: 'breadcrumbs-theme',
  components: {
    breadcrumbs(tokens) {
      return {
        backgroundColor: tokens.colors.background.success,
        element: {
          separator: {
            color: tokens.colors.brand.secondary[20],
            fontSize: tokens.fontSizes.xl,
          },
          link: {
            // Won't work:
            // TODO: Need nested modifiers
            // current: {
            //   color: tokens.colors.brand.secondary[80],
            // },
          },
        },
      };
    },
  },
});

export default function BreadcrumbsThemeExample() {
  return (
    <Theme theme={theme}>
      <Breadcrumbs
        items={[
          {
            href: '/',
            label: 'Home',
          },
          {
            href: '/react/components',
            label: 'Components',
          },
          {
            label: 'Breadcrumbs',
          },
        ]}
      />
    </Theme>
  );
}
