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
          backgroundColor: { value: 'rebeccapurple' },
        },
        button: {
          hover: {
            backgroundColor: { value: '{colors.neutral.40.value}' },
            color: { value: '{colors.white.value}' },
          },
        },
      },
    },
  },
};

export const PaginationThemeExample = () => {
  const paginationProps = usePagination({ totalPages: 6 });

  return (
    <ThemeProvider theme={theme}>
      <Pagination {...paginationProps} />
    </ThemeProvider>
  );
};
