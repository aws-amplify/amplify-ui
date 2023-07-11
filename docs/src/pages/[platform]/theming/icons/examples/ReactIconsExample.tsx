import {
  Theme,
  ThemeProvider,
  Alert,
  Rating,
  SearchField,
} from '@aws-amplify/ui-react';
import {
  FcApproval,
  FcHighPriority,
  FcLike,
  FcLikePlaceholder,
} from 'react-icons/fc';

const viewBox = { width: 48, height: 48 };

const theme: Theme = {
  name: 'my-theme',
  icons: {
    alert: {
      success: {
        viewBox,
        as: FcApproval,
      },
      error: {
        viewBox,
        as: FcHighPriority,
      },
    },
    rating: {
      filled: {
        viewBox,
        as: FcLike,
      },
      empty: {
        viewBox,
        as: FcLikePlaceholder,
      },
    },
  },
};

export const ReactIconsExample = () => {
  return (
    <ThemeProvider theme={theme}>
      <Alert variation="success">Success</Alert>
      <Alert variation="error">Error</Alert>
      <Rating value={3.5} />
    </ThemeProvider>
  );
};
