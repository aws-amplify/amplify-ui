import {
  Pagination,
  usePagination,
  ThemeProvider,
  Theme,
} from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'pagination-theme',
  tokens: {
    components: {
      pagination: {
        current: {
          backgroundColor: { value: '{colors.brand.secondary.80}' },
        },
        button: {
          hover: {
            backgroundColor: { value: '{colors.neutral.40}' },
            color: { value: '{colors.brand.secondary.80}' },
          },
        },
      },
    },
  },
};

export const PaginationThemeExample = () => {
  const paginationProps = usePagination({ totalPages: 6 });

  return (
    <ThemeProvider theme={theme} colorMode="light">
      <Pagination {...paginationProps} />
    </ThemeProvider>
  );
};
