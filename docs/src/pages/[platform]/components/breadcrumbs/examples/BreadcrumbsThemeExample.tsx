import { Breadcrumbs, ThemeProvider, createTheme } from '@aws-amplify/ui-react';

const theme = createTheme({
  name: 'breadcrumbs-theme',
  tokens: {
    components: {
      breadcrumbs: {
        separator: {
          color: '{colors.brand.secondary.20}',
          fontSize: '{fontSizes.xl}',
          paddingInline: '{space.medium}',
        },
        link: {
          current: {
            color: '{colors.brand.secondary.80}',
          },
        },
      },
    },
  },
});

export default function BreadcrumbsThemeExample() {
  return (
    <ThemeProvider theme={theme}>
      <Breadcrumbs
        items={[
          {
            href: '/react/components',
            label: 'Home',
          },
          {
            href: '/react/components',
            label: 'Components',
          },
          {
            label: 'Breadcrumbs',
            isCurrent: true,
          },
        ]}
      />
    </ThemeProvider>
  );
}
