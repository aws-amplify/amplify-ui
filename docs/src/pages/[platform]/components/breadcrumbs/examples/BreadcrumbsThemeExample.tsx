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
      <Breadcrumbs>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="/category">Category</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="/category/type">Type</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item isCurrent>
          <Breadcrumbs.Link href="/category/type/item">Item</Breadcrumbs.Link>
        </Breadcrumbs.Item>
      </Breadcrumbs>
    </ThemeProvider>
  );
}
